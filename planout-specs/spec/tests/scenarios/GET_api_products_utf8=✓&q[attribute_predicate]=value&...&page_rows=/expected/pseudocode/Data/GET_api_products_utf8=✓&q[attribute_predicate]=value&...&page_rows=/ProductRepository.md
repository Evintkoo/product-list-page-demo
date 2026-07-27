FUNCTION search_products(query_params):
    // ---------------------------------------------------------------
    // STEP 1 — Structural validation of the incoming shape
    // ---------------------------------------------------------------
    IF query_params.utf8 is present AND not a valid encoding marker THEN
        RETURN error_result(400, "Bad Request", "utf8 parameter malformed")
    END IF

    IF query_params has unexpected keys outside the documented ProductQueryParams shape THEN
        RETURN error_result(400, "Bad Request", "unrecognized query parameter")
    END IF

    // ---------------------------------------------------------------
    // STEP 2 — Type / value validation of each filter (maps to 422)
    // ---------------------------------------------------------------
    filters = query_params.q OR {}

    IF filters.product_brand_id_eq is present AND NOT is_integer(filters.product_brand_id_eq) THEN
        RETURN error_result(422, "Unprocessable Entity", "product_brand_id_eq must be an integer")
    END IF

    IF filters.product_type_id_eq is present AND NOT is_integer(filters.product_type_id_eq) THEN
        RETURN error_result(422, "Unprocessable Entity", "product_type_id_eq must be an integer")
    END IF

    IF filters.tax_id_eq is present AND NOT is_integer(filters.tax_id_eq) THEN
        RETURN error_result(422, "Unprocessable Entity", "tax_id_eq must be an integer")
    END IF

    IF filters.product_tags_id_in is present AND NOT is_array_of_integers(filters.product_tags_id_in) THEN
        RETURN error_result(422, "Unprocessable Entity", "product_tags_id_in must be an array of integers")
    END IF

    IF query_params.page_rows is present AND (NOT is_integer(query_params.page_rows) OR query_params.page_rows <= 0) THEN
        RETURN error_result(422, "Unprocessable Entity", "page_rows must be a positive integer")
    END IF

    IF filters.s is present AND NOT is_valid_sort_spec(filters.s) THEN
        RETURN error_result(422, "Unprocessable Entity", "s must be a valid sort expression such as 'name asc'")
    END IF

    // ---------------------------------------------------------------
    // STEP 3 — Referential existence checks (maps to 404)
    // ---------------------------------------------------------------
    IF filters.product_brand_id_eq is present THEN
        brand = FIND PRODUCT_BRAND WHERE id = filters.product_brand_id_eq
        IF brand IS NULL THEN
            RETURN error_result(404, "Not Found", "product_brand_id_eq does not reference an existing PRODUCT_BRAND")
        END IF
    END IF

    IF filters.product_type_id_eq is present THEN
        type_record = FIND PRODUCT_TYPE WHERE id = filters.product_type_id_eq
        IF type_record IS NULL THEN
            RETURN error_result(404, "Not Found", "product_type_id_eq does not reference an existing PRODUCT_TYPE")
        END IF
    END IF

    IF filters.tax_id_eq is present THEN
        tax_record = FIND TAX WHERE id = filters.tax_id_eq
        IF tax_record IS NULL THEN
            RETURN error_result(404, "Not Found", "tax_id_eq does not reference an existing TAX")
        END IF
    END IF

    IF filters.product_tags_id_in is present AND length(filters.product_tags_id_in) > 0 THEN
        found_tags = FIND ALL PRODUCT_TAG WHERE id IN filters.product_tags_id_in
        IF length(found_tags) < length(distinct(filters.product_tags_id_in)) THEN
            RETURN error_result(404, "Not Found", "one or more product_tags_id_in values do not reference an existing PRODUCT_TAG")
        END IF
    END IF

    // ---------------------------------------------------------------
    // STEP 4 — Authorization gate (maps to 401 / 403)
    // Delegated upstream by the Logic swimlane, but the Data layer still
    // enforces a defensive check before executing any query.
    // ---------------------------------------------------------------
    IF current_caller_identity IS NULL THEN
        RETURN error_result(401, "Unauthorized", "missing or invalid authentication context")
    END IF

    IF NOT current_caller_identity.has_permission("list_products") THEN
        RETURN error_result(403, "Forbidden", "caller lacks permission to list products")
    END IF

    // ---------------------------------------------------------------
    // STEP 5 — Rate limit check (maps to 429)
    // ---------------------------------------------------------------
    IF rate_limiter.is_exceeded(current_caller_identity) THEN
        RETURN error_result(429, "Too Many Requests", "rate limit exceeded for this caller")
    END IF

    // ---------------------------------------------------------------
    // STEP 6 — Build and execute the query (happy path -> 200)
    // ---------------------------------------------------------------
    TRY
        query = BUILD QUERY ON PRODUCT
            LEFT JOIN PRODUCT_BRAND ON PRODUCT.product_brand_id = PRODUCT_BRAND.id
            LEFT JOIN PRODUCT_TYPE ON PRODUCT.product_type_id = PRODUCT_TYPE.id
            LEFT JOIN TAX ON PRODUCT.tax_id = TAX.id
            LEFT JOIN PRODUCT_TAG_ASSIGNMENT ON PRODUCT_TAG_ASSIGNMENT.product_id = PRODUCT.id

        IF filters.sku_cont present THEN ADD WHERE PRODUCT.sku CONTAINS filters.sku_cont
        IF filters.name_cont present THEN ADD WHERE PRODUCT.name CONTAINS filters.name_cont
        IF filters.product_code_cont present THEN ADD WHERE PRODUCT.product_code CONTAINS filters.product_code_cont
        IF filters.product_brand_id_eq present THEN ADD WHERE PRODUCT.product_brand_id = filters.product_brand_id_eq
        IF filters.product_type_id_eq present THEN ADD WHERE PRODUCT.product_type_id = filters.product_type_id_eq
        IF filters.tax_id_eq present THEN ADD WHERE PRODUCT.tax_id = filters.tax_id_eq
        IF filters.product_tags_id_in present THEN ADD WHERE PRODUCT_TAG_ASSIGNMENT.product_tag_id IN filters.product_tags_id_in
        IF filters.info_1_cont present THEN ADD WHERE PRODUCT.info_1 CONTAINS filters.info_1_cont
        IF filters.info_2_cont present THEN ADD WHERE PRODUCT.info_2 CONTAINS filters.info_2_cont
        IF filters.info_3_cont present THEN ADD WHERE PRODUCT.info_3 CONTAINS filters.info_3_cont

        ADD DISTINCT ON PRODUCT.id   // avoid duplicate rows from the tag join

        IF filters.s present THEN
            ADD ORDER BY parse_sort_spec(filters.s)
        ELSE
            ADD ORDER BY PRODUCT.id ASC
        END IF

        page_size = query_params.page_rows OR DEFAULT_PAGE_ROWS
        ADD LIMIT page_size

        result_rows = EXECUTE query

        RETURN success_result(200, "OK", result_rows)

    CATCH unexpected_database_error AS error
        LOG error
        RETURN error_result(500, "Internal Server Error", "unexpected server-side failure")
    END TRY
END FUNCTION


FUNCTION success_result(status_code, status_label, rows):
    RETURN {
        status: status_code,
        status_label: status_label,
        data: rows,
        meta: { page_rows: length(rows) }
    }
END FUNCTION


FUNCTION error_result(status_code, status_label, message):
    RETURN {
        status: status_code,
        status_label: status_label,
        error: message
    }
END FUNCTION