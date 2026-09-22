FUNCTION handleConfirmPurchaseOrder(request, response):
    // 1. Validate UUID format for :id
    IF NOT isValidUuid(request.params.id):
        RETURN response.status(400).json({ error: "Invalid ID format" })

    // 2. Authentication & Authorization
    user = getCurrentUser(request.session)
    IF user IS NULL:
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    IF user.role NOT IN ["admin", "manager"]:
        RETURN response.status(403).json({ error: "Forbidden" })

    // 3. Fetch Order
    order = DB.FranchisePurchaseOrder.findById(request.params.id)
    
    IF order IS NULL OR order.company_id != user.company_id:
        RETURN response.status(404).json({ error: "Order not found" })

    // 4. State Transition Logic
    // Only allow transition if current state is 'draft'
    IF order.franchise_workflow_state != "draft":
        RETURN response.status(409).json({ error: "Order cannot be confirmed from current state" })

    // 5. Update Record
    TRY:
        order.franchise_workflow_state = "store_confirmed"
        order.updated_at = CURRENT_TIMESTAMP
        
        DB.FranchisePurchaseOrder.update(order)
        
        RETURN response.status(200).json(order)
    CATCH Exception:
        RETURN response.status(500).json({ error: "Internal Server Error" })