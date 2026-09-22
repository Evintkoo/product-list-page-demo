/**
 * Handles the creation of a new Stock Outgoing document.
 * The process is client-side driven until the user clicks "Save",
 * at which point the form state is mapped to the API schema.
 */

function handleSaveStockOutgoing(formData) {
    // 1. Construct the header payload from form state
    const payload = {
        source_id: formData.source_id,
        source_type: formData.source_type,
        supplier_ref_code: formData.supplier_ref_code,
        due_at: formData.due_at,
        notes: formData.notes,
        service_work_order_ids: formData.service_work_order_ids, // <!-- MISSING_FIELD: StockOutgoing.service_work_order_ids -->
        lines: formData.lines.map(line => ({
            product_id: line.product_id,
            order_quantity: line.order_quantity,
            average_cost: line.average_cost,
            coa_id: line.coa_id
        }))
    };

    // 2. Submit to API
    return apiClient.post('/api/stock-outgoings', payload);
}

/**
 * Logic for row population:
 * When a user selects a product, the system fetches the current 
 * average cost and available stock from the selected source (Warehouse/Store).
 */
function onProductSelected(productId, sourceId, sourceType) {
    // Fetch product details and current stock metrics
    // This populates the row with average_cost and validates availability
    const productData = fetchProductMetrics(productId, sourceId, sourceType);
    
    return {
        product_id: productId,
        average_cost: productData.average_cost,
        // order_quantity remains empty for user input
    };
}