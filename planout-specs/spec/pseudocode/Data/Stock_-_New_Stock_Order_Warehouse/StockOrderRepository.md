/**
 * Handles persistence for the New Stock Order Warehouse feature.
 * Maps the incoming UI payload to the relational schema.
 */

FUNCTION createStockOrder(payload):
    // 1. Start database transaction
    BEGIN TRANSACTION

    // 2. Insert the parent StockOrder record
    SET newOrderId = GENERATE_UUID()
    INSERT INTO StockOrder (
        id, 
        workflow_state, 
        from_warehouse_id, 
        to_store_id, 
        ref_code, 
        due_at, 
        notes, 
        created_at
    ) VALUES (
        newOrderId,
        payload.workflow_state,
        payload.from_warehouse_id,
        payload.to_store_id,
        payload.ref_code,
        payload.due_at,
        payload.notes,
        CURRENT_TIMESTAMP
    )

    // 3. Iterate through the order product list and insert line items
    FOR EACH item IN payload.order_products:
        INSERT INTO StockOrderItem (
            id,
            stock_order_id,
            product_id,
            store_qty,
            order_qty,
            company_average_cost,
            store_remark
        ) VALUES (
            GENERATE_UUID(),
            newOrderId,
            item.product_id,
            item.store_qty,
            item.order_qty,
            item.company_average_cost,
            item.store_remark
        )
    END FOR

    // 4. Commit transaction
    COMMIT TRANSACTION
    RETURN newOrderId

END FUNCTION