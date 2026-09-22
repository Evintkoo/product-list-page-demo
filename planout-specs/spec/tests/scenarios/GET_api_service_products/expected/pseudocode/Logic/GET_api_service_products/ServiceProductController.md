FUNCTION getServiceProducts(request):
    // 1. Validate Query Parameters
    SET page = request.query.page OR 1
    SET limit = MIN(request.query.page_limit OR 100, 300)
    SET filterActive = request.query.active IS NULL ? TRUE : request.query.active
    
    // 2. Build Query
    SET query = ServiceProduct.find()
    
    IF request.query.id IS NOT NULL:
        query.where(id = request.query.id)
    
    IF request.query.sku IS NOT NULL:
        query.where(sku = request.query.sku)
        
    IF request.query.modified_after IS NOT NULL:
        query.where(updated_at > request.query.modified_after)
        
    // Apply default active filter as per business requirement
    query.where(active = filterActive)
    
    // 3. Apply Sorting
    SET sortField = request.query.sort_by OR "id"
    SET sortDir = request.query.sort_direction OR "ASC"
    query.orderBy(sortField, sortDir)
    
    // 4. Apply Pagination
    query.offset((page - 1) * limit)
    query.limit(limit)
    
    // 5. Execute and Return
    TRY:
        SET results = query.execute()
        RETURN 200, results
    CATCH DatabaseError:
        RETURN 500, { "error": "Internal Server Error" }
    CATCH ValidationError:
        RETURN 400, { "error": "Malformed query parameters" }