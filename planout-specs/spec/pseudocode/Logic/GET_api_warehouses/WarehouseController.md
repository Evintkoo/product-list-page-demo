FUNCTION handleGetWarehouses(request):
    // 1. Validate Query Parameters
    SET page = request.query.page OR 1
    SET page_limit = MIN(request.query.page_limit OR 100, 300)
    SET modified_after = request.query.modified_after
    SET active = request.query.active OR "true"
    SET sort_by = request.query.sort_by OR "updated_at"
    SET sort_direction = request.query.sort_direction OR "ASC"
    SET after_id = request.query.after_id

    // Validate types and constraints
    IF NOT is_integer(page) OR NOT is_integer(page_limit):
        RETURN 400, { "error": "Invalid numeric parameters" }
    
    // 2. Delegate to Service Layer
    TRY:
        SET results = WarehouseService.fetchList(
            page, 
            page_limit, 
            modified_after, 
            active, 
            sort_by, 
            sort_direction, 
            after_id
        )
        RETURN 200, results
    CATCH error:
        RETURN 500, { "error": "Internal Server Error" }