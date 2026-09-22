/**
 * Logic to handle the submission of the New Order Warehouse Form.
 * Maps UI inputs to the StockOrder entity schema.
 */

function handleCreateStockOrder(formData) {
    // 1. Validate required fields
    const requiredFields = ['from_warehouse_id', 'to_store_id', 'ref_code', 'due_at', 'workflow_state'];
    
    for (const field of requiredFields) {
        if (!formData[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    // 2. Map UI fields to Data Schema
    const stockOrderPayload = {
        warehouse_id: formData.from_warehouse_id,
        order_type: "TRANSFER", // Defaulting based on context
        status: formData.workflow_state,
        // Additional fields mapped to schema extensions
        to_store_id: formData.to_store_id,      <!-- MISSING_FIELD: StockOrder.to_store_id -->
        ref_code: formData.ref_code,            <!-- MISSING_FIELD: StockOrder.ref_code -->
        due_at: formData.due_at,                <!-- MISSING_FIELD: StockOrder.due_at -->
        notes: formData.notes                   <!-- MISSING_FIELD: StockOrder.notes -->
    };

    // 3. Persist to database
    return database.StockOrder.insert(stockOrderPayload);
}