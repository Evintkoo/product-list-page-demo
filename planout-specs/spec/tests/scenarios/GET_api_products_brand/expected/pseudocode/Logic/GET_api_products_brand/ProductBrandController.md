FUNCTION getProductBrands(request):
    // 1. Extract and normalize pagination parameters
    // Priority: rows > pagesize > pageLimit > default 20
    SET limit = request.query.rows OR request.query.pagesize OR request.query.pageLimit OR 20
    SET page = request.query.page OR 1
    
    // 2. Validate parameters
    IF limit < 1 OR page < 1:
        RETURN 400 "Invalid pagination parameters"
    
    // 3. Build query filters
    SET query = request.query.q
    SET offset = (page - 1) * limit
    
    // 4. Fetch from database
    // Logic: SELECT * FROM ProductBrand 
    // WHERE (query IS NULL OR brandName ILIKE %query%)
    // ORDER BY brandName ASC
    // LIMIT limit OFFSET offset
    SET results = ProductBrandService.findBrands(query, limit, offset)
    
    // 5. Handle empty results for specific search
    IF query IS NOT NULL AND results IS EMPTY:
        RETURN 404 "No brands found matching the criteria"
        
    RETURN 200 results