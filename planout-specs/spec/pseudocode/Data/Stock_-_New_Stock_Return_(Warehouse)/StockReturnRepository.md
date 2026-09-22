/**
 * Handles persistence for Stock Return (Warehouse) operations.
 * Maps the incoming API request payload to the database schema.
 */

FUNCTION createStockReturn(payload):
    // 1. Start database transaction
    BEGIN TRANSACTION

    // 2. Insert the parent StockReturn record
    SET newReturn = INSERT INTO StockReturn (
        workflow_state, 
        type, 
        from_store_id, 
        to_internal_supplier_id, 
        to_warehouse_id, 
        ref_code, 
        notes
    ) VALUES (
        payload.workflow_state,
        payload.type,
        payload.from_store_id,
        payload.to_internal_supplier_id,
        payload.to_warehouse_id,
        payload.ref_code,
        payload.notes
    )

    // 3. Iterate through the product list and insert line items
    FOR EACH item IN payload.products:
        INSERT INTO StockReturnItem (
            stock_return_id,
            product_id,
            store_quantity,
            quantity,
            reason
        ) VALUES (
            newReturn.id,
            item.product_id,
            item.store_quantity,
            item.quantity,
            item.reason
        )
    END FOR

    // 4. Commit transaction
    COMMIT TRANSACTION
    RETURN newReturn.id