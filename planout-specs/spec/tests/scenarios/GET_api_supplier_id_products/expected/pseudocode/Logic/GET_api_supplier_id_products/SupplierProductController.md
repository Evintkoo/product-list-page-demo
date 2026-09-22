FUNCTION handleGetSupplierProducts(request, response):
    // 1. Validate input
    SET supplierId = request.params.id
    IF NOT isValidUuid(supplierId) THEN
        RETURN response.status(400).json({ error: "Invalid supplier_id format" })
    END IF

    // 2. Authentication check
    IF NOT isAuthenticated(request) THEN
        RETURN response.status(401).json({ error: "Unauthorized" })
    END IF

    // 3. Verify Supplier existence and ownership
    // We assume the current user's company_id is available in the session/token
    SET currentCompanyId = request.user.company_id
    SET supplier = Database.Supplier.findOne({ id: supplierId })

    IF supplier IS NULL OR supplier.company_id != currentCompanyId THEN
        RETURN response.status(404).json({ error: "Supplier not found or access denied" })
    END IF

    // 4. Fetch products
    // Pagination parameters (page, limit) are extracted from query string
    SET page = request.query.page OR 1
    SET limit = request.query.limit OR 20
    
    SET products = Database.Product.findMany(
        { supplier_id: supplierId },
        { limit: limit, offset: (page - 1) * limit }
    )

    // 5. Return response
    RETURN response.status(200).json(products)

CATCH error:
    RETURN response.status(500).json({ error: "Internal Server Error" })
END FUNCTION