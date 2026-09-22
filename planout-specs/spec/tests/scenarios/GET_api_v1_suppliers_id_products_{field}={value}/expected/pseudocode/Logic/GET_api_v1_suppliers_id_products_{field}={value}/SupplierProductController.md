FUNCTION getSupplierProducts(request, response):
    // 1. Authentication Check
    IF NOT request.isAuthenticated():
        RETURN response.status(401).json({ error: "Unauthorized" })

    // 2. Validate Supplier Existence
    supplierId = request.params.id
    supplier = Database.Supplier.findById(supplierId)
    IF supplier IS NULL:
        RETURN response.status(404).json({ error: "Supplier not found" })

    // 3. Parse and Validate Query Filters
    allowedFilters = ["sku", "name", "discount_percent"]
    queryFilters = {}
    
    FOR EACH key, value IN request.query:
        IF key IN allowedFilters:
            queryFilters[key] = value
        ELSE IF key NOT IN ["page", "per_page"]:
            RETURN response.status(400).json({ error: "Invalid filter field: " + key })

    // 4. Pagination Setup
    page = request.query.page OR 1
    perPage = request.query.per_page OR 25

    // 5. Fetch Products
    TRY:
        products = Database.Product.findMany(
            where: { 
                supplier_id: supplierId,
                ...queryFilters 
            },
            limit: perPage,
            offset: (page - 1) * perPage
        )
        
        RETURN response.status(200).json(products)
        
    CATCH error:
        RETURN response.status(500).json({ error: "Internal Server Error" })