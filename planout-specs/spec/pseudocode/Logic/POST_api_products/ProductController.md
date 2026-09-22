FUNCTION handleCreateProduct(request, response):
    // 1. Authentication Check
    IF NOT user.isAuthenticated():
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    // 2. Validation
    // Ensure required fields are present
    IF NOT request.body.sku OR NOT request.body.name OR NOT request.body.price:
        RETURN response.status(400).json({ error: "Missing required fields: sku, name, or price" })

    // 3. Business Logic Execution
    TRY:
        newProduct = ProductService.createProduct(request.body)
        RETURN response.status(201).json(newProduct)
    CATCH SKUAlreadyExistsError:
        RETURN response.status(409).json({ error: "Product with this SKU already exists" })
    CATCH Exception:
        RETURN response.status(500).json({ error: "Internal server error" })