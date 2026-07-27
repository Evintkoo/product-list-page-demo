FUNCTION handle_get_products(request):

    // ---- 1. Authentication & Authorization ----
    IF request has no valid auth token OR token expired THEN
        RETURN 401 Unauthorized { error: "unauthenticated", code: "AUTH_REQUIRED" }
    END IF

    IF authenticated_user lacks "list_products" permission THEN
        RETURN 403 Forbidden { error: "forbidden", code: "PRODUCT_LIST_DENIED" }
    END IF

    // ---- 2. Rate limiting ----
    IF rate_limit_exceeded_for(authenticated_user) THEN
        RETURN 429 Too Many Requests { error: "rate_limited", code: "RATE_LIMIT_EXCEEDED" }
    END IF

    // ---- 3. Parse & validate incoming query parameters ----
    raw_params = extract_query_params(request)
    // Expected shape:
    //   utf8 (string, cosmetic form marker - ignore in logic)
    //   q.sku_cont (string)
    //   q.name_cont (string)
    //   q.product_code_cont (string)
    //   q.product_brand_id_eq (integer)
    //   q.product_type_id_eq (integer)
    //   q.tax_id_eq (integer)
    //   q.product_tags_id_in (array of integer)
    //   q.info_1_cont (string)
    //   q.info_2_cont (string)
    //   q.info_3_cont (string)
    //   q.s (string or array - sort instruction, e.g. "name asc")
    //   page_rows (integer)

    validation_errors = []

    IF raw_params.q.product_brand_id_eq is present AND NOT integer THEN
        validation_errors.push("q[product_brand_id_eq] must be an integer")
    END IF
    IF raw_params.q.product_type_id_eq is present AND NOT integer THEN
        validation_errors.push("q[product_type_id_eq] must be an integer")
    END IF
    IF raw_params.q.tax_id_eq is present AND NOT integer THEN
        validation_errors.push("q[tax_id_eq] must be an integer")
    END IF
    IF raw_params.q.product_tags_id_in is present AND NOT array_of_integers THEN
        validation_errors.push("q[product_tags_id_in][] must be integers")
    END IF
    IF raw_params.page_rows is present AND (NOT integer OR raw_params.page_rows <= 0) THEN
        validation_errors.push("page_rows must be a positive integer")
    END IF
    IF raw_params.q.s is present AND format does not match "<field> <asc|desc>" THEN
        validation_errors.push("q[s] must be formatted as '<field> asc' or '<field> desc'")
    END IF

    IF raw_params malformed (e.g. unparsable query string, wrong bracket nesting) THEN
        RETURN 400 Bad Request { error: "malformed_query", code: "BAD_QUERY_PARAMS" }
    END IF

    IF validation_errors is not empty THEN
        RETURN 422 Unprocessable Entity { errors: validation_errors }
    END IF

    // ---- 4. Verify referenced foreign ids actually exist ----
    IF raw_params.q.product_brand_id_eq present THEN
        brand = find PRODUCT_BRAND by PRODUCT_BRAND.id == raw_params.q.product_brand_id_eq
        IF brand not found THEN
            RETURN 404 Not Found { error: "not_found", code: "PRODUCT_BRAND_NOT_FOUND" }
        END IF
    END IF

    IF raw_params.q.product_type_id_eq present THEN
        type_record = find PRODUCT_TYPE by PRODUCT_TYPE.id == raw_params.q.product_type_id_eq
        IF type_record not found THEN
            RETURN 404 Not Found { error: "not_found", code: "PRODUCT_TYPE_NOT_FOUND" }
        END IF
    END IF

    IF raw_params.q.tax_id_eq present THEN
        tax_record = find TAX by TAX.id == raw_params.q.tax_id_eq
        IF tax_record not found THEN
            RETURN 404 Not Found { error: "not_found", code: "TAX_NOT_FOUND" }
        END IF
    END IF

    IF raw_params.q.product_tags_id_in present THEN
        FOR EACH tag_id IN raw_params.q.product_tags_id_in:
            tag = find PRODUCT_TAG by PRODUCT_TAG.id == tag_id
            IF tag not found THEN
                RETURN 404 Not Found { error: "not_found", code: "PRODUCT_TAG_NOT_FOUND" }
            END IF
        END FOR
    END IF

    // ---- 5. Build filter/query criteria against PRODUCT ----
    criteria = new_empty_criteria()

    IF raw_params.q.sku_cont present THEN
        criteria.add( PRODUCT.sku CONTAINS raw_params.q.sku_cont )
    END IF
    IF raw_params.q.name_cont present THEN
        criteria.add( PRODUCT.name CONTAINS raw_params.q.name_cont )
    END IF
    IF raw_params.q.product_code_cont present THEN
        criteria.add( PRODUCT.product_code CONTAINS raw_params.q.product_code_cont )
    END IF
    IF raw_params.q.product_brand_id_eq present THEN
        criteria.add( PRODUCT.product_brand_id EQUALS raw_params.q.product_brand_id_eq )
    END IF
    IF raw_params.q.product_type_id_eq present THEN
        criteria.add( PRODUCT.product_type_id EQUALS raw_params.q.product_type_id_eq )
    END IF
    IF raw_params.q.tax_id_eq present THEN
        criteria.add( PRODUCT.tax_id EQUALS raw_params.q.tax_id_eq )
    END IF
    IF raw_params.q.product_tags_id_in present THEN
        // Join through PRODUCT_TAG_ASSIGNMENT to filter products having any of the given tag ids
        criteria.add( PRODUCT.id IN (
            SELECT PRODUCT_TAG_ASSIGNMENT.product_id
            FROM PRODUCT_TAG_ASSIGNMENT
            WHERE PRODUCT_TAG_ASSIGNMENT.product_tag_id IN raw_params.q.product_tags_id_in
        ))
    END IF
    IF raw_params.q.info_1_cont present THEN
        criteria.add( PRODUCT.info_1 CONTAINS raw_params.q.info_1_cont )
    END IF
    IF raw_params.q.info_2_cont present THEN
        criteria.add( PRODUCT.info_2 CONTAINS raw_params.q.info_2_cont )
    END IF
    IF raw_params.q.info_3_cont present THEN
        criteria.add( PRODUCT.info_3 CONTAINS raw_params.q.info_3_cont )
    END IF

    // ---- 6. Sorting ----
    IF raw_params.q.s present THEN
        sort_field, sort_direction = parse_sort_instruction(raw_params.q.s)
        // sort_field must map to one of: sku, name, product_code, created_at, updated_at, etc.
        criteria.set_sort( sort_field, sort_direction )
    ELSE
        criteria.set_sort( "created_at", "desc" )  // default sort
    END IF

    // ---- 7. Pagination ----
    page_number = raw_params.page NUMBER OR 1
    page_size = raw_params.page_rows OR default_page_size (e.g. 25)
    criteria.set_pagination( page_number, page_size )

    // ---- 8. Execute query ----
    TRY
        result_set = query PRODUCT WHERE criteria APPLYING sort AND pagination
        total_count = count PRODUCT WHERE criteria (ignoring pagination)
    CATCH unexpected_database_error
        RETURN 500 Internal Server Error { error: "internal_error", code: "PRODUCT_QUERY_FAILED" }
    END TRY

    // ---- 9. Shape response payload ----
    products_payload = []
    FOR EACH product IN result_set:
        products_payload.push({
            id: product.id,
            sku: product.sku,
            name: product.name,
            product_code: product.product_code,
            product_brand_id: product.product_brand_id,
            product_type_id: product.product_type_id,
            tax_id: product.tax_id,
            info_1: product.info_1,
            info_2: product.info_2,
            info_3: product.info_3,
            created_at: product.created_at,
            updated_at: product.updated_at
        })
    END FOR

    RETURN 200 OK {
        products: products_payload,
        page: page_number,
        page_rows: page_size,
        total_count: total_count
    }

END FUNCTION