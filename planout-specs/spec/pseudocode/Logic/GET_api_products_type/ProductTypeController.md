FUNCTION getProductTypes(request):
    // 1. Extract and normalize pagination parameters
    // Priority: rows > pagesize > pageLimit > default 20
    SET limit = request.query.rows OR request.query.pagesize OR request.query.pageLimit OR 20
    SET page = request.query.page OR 1
    
    // 2. Validate parameters
    IF page < 1 OR limit < 1:
        RETURN 400 Bad Request ("Invalid pagination parameters")
    
    // 3. Prepare query filters
    SET searchQuery = request.query.q
    
    // 4. Fetch from database
    // Logic: SELECT * FROM ProductType 
    // WHERE (searchQuery IS NULL OR productTypeName ILIKE %searchQuery%)
    // ORDER BY productTypeName ASC
    // LIMIT limit OFFSET (page - 1) * limit
    
    SET results = Database.ProductType.findMany(
        filter: { 
            productTypeName: { contains: searchQuery, mode: 'insensitive' } 
        },
        orderBy: { productTypeName: 'asc' },
        take: limit,
        skip: (page - 1) * limit
    )
    
    // 5. Handle empty results for specific search
    IF searchQuery IS NOT NULL AND results IS EMPTY:
        RETURN 404 Not Found ("No product types match the search criteria")
        
    RETURN 200 OK (results)