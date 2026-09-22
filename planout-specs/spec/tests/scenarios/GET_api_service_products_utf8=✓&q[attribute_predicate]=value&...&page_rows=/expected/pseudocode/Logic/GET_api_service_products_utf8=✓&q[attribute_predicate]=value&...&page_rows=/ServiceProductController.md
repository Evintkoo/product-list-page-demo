FUNCTION GET /api/service_products(params):
    // 1. Authentication & Authorization
    IF NOT user_is_authenticated():
        RETURN 401 Unauthorized
    
    IF NOT user_has_permission("list_service_products"):
        RETURN 403 Forbidden

    // 2. Validate Query Parameters
    TRY:
        validate_ransack_params(params.q)
        IF params.page_rows IS NOT NULL AND params.page_rows < 0:
            RETURN 422 Unprocessable Entity
    CATCH ValidationException:
        RETURN 400 Bad Request

    // 3. Verify Existence of Filter References
    IF params.q.service_product_type_id_eq IS NOT NULL:
        IF NOT ServiceProductType.exists(id = params.q.service_product_type_id_eq):
            RETURN 404 Not Found

    IF params.q.service_product_tags_id_in IS NOT NULL:
        FOR tag_id IN params.q.service_product_tags_id_in:
            IF NOT ServiceProductTag.exists(id = tag_id):
                RETURN 404 Not Found

    // 4. Build Query
    query = ServiceProduct.all()

    // Apply Ransack-style filters
    IF params.q.sku_cont:
        query = query.where("sku LIKE ?", "%" + params.q.sku_cont + "%")
    
    IF params.q.name_cont:
        query = query.where("name LIKE ?", "%" + params.q.name_cont + "%")
        
    IF params.q.service_product_type_id_eq:
        query = query.where(service_product_type_id = params.q.service_product_type_id_eq)
        
    IF params.q.service_product_tags_id_in:
        query = query.joins(ServiceProductTagging)
                     .where(ServiceProductTagging.service_product_tag_id IN params.q.service_product_tags_id_in)

    // 5. Apply Sorting and Pagination
    IF params.q.s:
        query = query.order_by(params.q.s)
    
    limit = params.page_rows OR DEFAULT_PAGE_SIZE
    results = query.limit(limit).fetch()

    // 6. Return Response
    RETURN 200 OK, results (fields: id, sku, name, service_product_type_id, created_at)

EXCEPTION HANDLING:
    ON DatabaseError:
        RETURN 500 Internal Server Error
    ON RateLimitExceeded:
        RETURN 429 Too Many Requests