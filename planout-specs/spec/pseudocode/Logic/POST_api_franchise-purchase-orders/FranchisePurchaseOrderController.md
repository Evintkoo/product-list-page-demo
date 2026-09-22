FUNCTION handleCreateFranchisePurchaseOrder(request, response):
    // 1. Authentication & Authorization Check
    IF NOT request.user.isAuthenticated():
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    IF NOT request.user.hasPermission("CREATE_PURCHASE_ORDER"):
        RETURN response.status(403).json({ error: "Forbidden" })

    // 2. Validate Input
    // Ensure required fields are present in the request body
    IF NOT request.body.from_warehouse_id OR NOT request.body.to_store_id OR NOT request.body.supplier_id:
        RETURN response.status(400).json({ error: "Missing required fields" })

    // 3. Delegate to Service Layer
    TRY:
        newOrder = FranchisePurchaseOrderService.createOrder({
            from_warehouse_id: request.body.from_warehouse_id,
            to_store_id: request.body.to_store_id,
            supplier_id: request.body.supplier_id,
            created_by: request.user.id
        })
        RETURN response.status(201).json(newOrder)
    CATCH error:
        RETURN response.status(500).json({ error: "Internal Server Error" })