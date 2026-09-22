/**
 * Handles the submission of a new stock return from a warehouse.
 * Orchestrates the creation of the StockReturn header and its associated items.
 */
function handleCreateStockReturn(requestBody) {
    // 1. Validate incoming payload structure
    const { 
        from_store_id, 
        to_internal_supplier_id, 
        to_warehouse_id, 
        ref_code, 
        notes, 
        items 
    } = requestBody;

    // 2. Prepare StockReturn record
    const newStockReturn = {
        id: generateUUID(),
        workflow_state: "draft", // Default state as per requirements
        type: "warehouse_return", // <!-- MISSING_FIELD: StockReturn.type_value_definition -->
        from_store_id,
        to_internal_supplier_id,
        to_warehouse_id,
        ref_code,
        notes,
        created_at: getCurrentTimestamp()
    };

    // 3. Persist to database
    // Start Transaction
    try {
        saveStockReturn(newStockReturn);

        // 4. Process and save associated items
        items.forEach(item => {
            const returnItem = {
                id: generateUUID(),
                stock_return_id: newStockReturn.id,
                product_id: item.product_id,
                store_quantity: item.store_quantity,
                quantity: item.quantity,
                reason: item.reason
            };
            saveStockReturnItem(returnItem);
        });
        
        // Commit Transaction
        return { status: 201, data: { id: newStockReturn.id, workflow_state: newStockReturn.workflow_state } };
    } catch (error) {
        // Rollback Transaction
        return { status: 422, error: "Failed to create stock return" };
    }
}