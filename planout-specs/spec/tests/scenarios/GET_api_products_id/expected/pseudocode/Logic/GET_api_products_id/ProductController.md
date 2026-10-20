FUNCTION getProductById(request, response):
    // 1. Validate input
    SET productId = request.params.id
    
    IF NOT isValidUuid(productId):
        RETURN response.status(400).json({ error: "Malformed ID format" })
    
    // 2. Authentication check
    IF NOT isAuthenticated(request):
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    // 3. Fetch data from storage
    TRY:
        SET product = Database.find("Product", { id: productId })
        
        IF product IS NULL:
            RETURN response.status(404).json({ error: "Product not found" })
            
        // 4. Return standard Product JSON schema
        RETURN response.status(200).json({
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: product.price,
            description: product.description,
            created_at: product.created_at
        })
        
    CATCH error:
        // 5. Handle unexpected server errors
        LOG error
        RETURN response.status(500).json({ error: "Internal Server Error" })