FUNCTION handleCreateSalesOrder(request):
    // 1. Validate Authentication
    IF session IS missing OR invalid:
        RETURN 401 Unauthorized

    // 2. Validate Request Schema
    IF request.body IS invalid:
        RETURN 400 Bad Request

    // 3. Verify Foreign Keys (Existence Check)
    // Ensure customer, warehouse, and salesperson exist
    IF NOT Customer.exists(request.body.customer_id) OR
       NOT Warehouse.exists(request.body.warehouse_id) OR
       NOT User.exists(request.body.salesperson_id):
        RETURN 422 Unprocessable Entity

    // 4. Verify Product existence for all items
    FOR EACH item IN request.body.items:
        IF NOT Product.exists(item.product_id):
            RETURN 422 Unprocessable Entity

    // 5. Execute Transactional Creation
    BEGIN TRANSACTION
        // Create the SalesOrder record
        SET newOrder = SalesOrder.create({
            id: generateUUID(),
            customer_id: request.body.customer_id,
            warehouse_id: request.body.warehouse_id,
            salesperson_id: request.body.salesperson_id,
            workflow_state: "draft",
            created_at: currentTimestamp()
        })

        // Create associated SalesOrderItems
        FOR EACH item IN request.body.items:
            SalesOrderItem.create({
                id: generateUUID(),
                sales_order_id: newOrder.id,
                product_id: item.product_id,
                quantity: item.quantity
            })
    COMMIT TRANSACTION

    // 6. Return Success
    RETURN 201 Created, newOrder

CATCH Exception:
    ROLLBACK TRANSACTION
    RETURN 500 Internal Server Error