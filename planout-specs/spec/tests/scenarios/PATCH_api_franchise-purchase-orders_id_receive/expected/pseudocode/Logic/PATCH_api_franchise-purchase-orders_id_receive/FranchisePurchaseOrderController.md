FUNCTION handleReceivePurchaseOrder(request, response):
    // 1. Validate Authentication and Authorization
    IF NOT session.isValid():
        RETURN response.error(401, "Unauthorized")
    
    IF NOT user.hasRole("admin", "manager"):
        RETURN response.error(403, "Forbidden")

    // 2. Fetch Order
    order = Database.find(FranchisePurchaseOrder, request.params.id)
    IF NOT order:
        RETURN response.error(404, "Order not found")

    // 3. Validate State
    IF order.franchise_workflow_state != "placed":
        RETURN response.error(409, "Order must be in 'placed' state to receive")

    // 4. Validate Input Items
    items = request.body.items
    IF hasDuplicates(items, "product_id"):
        RETURN response.error(422, "Duplicate product_id in request")

    // 5. Atomic Transaction
    BEGIN TRANSACTION
        FOR EACH item IN items:
            line = Database.find(FranchisePurchaseOrderLine, {
                franchise_purchase_order_id: order.id,
                product_id: item.product_id
            })
            
            IF NOT line:
                ROLLBACK
                RETURN response.error(404, "Product not found on order")
            
            IF item.receive_qty > line.order_qty:
                ROLLBACK
                RETURN response.error(422, "Receive quantity exceeds order quantity")
            
            // Update line with received quantity
            line.receive_qty = item.receive_qty
            Database.save(line)
            
            // Create Inventory Movement
            InventoryMovement.create({
                product_id: item.product_id,
                franchise_id: order.franchise_id,
                quantity_change: item.receive_qty,
                movement_type: "purchase_order_receipt", <!-- MISSING_FIELD: InventoryMovement.movement_type_enum_value -->
                created_at: CurrentTimestamp()
            })

        // Update Order State
        order.franchise_workflow_state = "store_received"
        order.updated_at = CurrentTimestamp()
        Database.save(order)
    COMMIT

    RETURN response.success(200, order)