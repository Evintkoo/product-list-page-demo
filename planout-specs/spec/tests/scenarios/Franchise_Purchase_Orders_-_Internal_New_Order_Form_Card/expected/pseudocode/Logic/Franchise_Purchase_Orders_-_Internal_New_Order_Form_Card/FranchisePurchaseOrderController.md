/**
 * Logic to handle the creation of a new Franchise Purchase Order.
 * Maps UI input state to the FranchisePurchaseOrder schema.
 */

function handleCreatePurchaseOrder(formData) {
    // 1. Validate required fields
    const requiredFields = ['from_warehouse_id', 'to_store_id', 'from_supplier_id'];
    for (const field of requiredFields) {
        if (!formData[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    // 2. Construct payload based on FranchisePurchaseOrder schema
    const payload = {
        from_warehouse_id: formData.from_warehouse_id,
        to_store_id: formData.to_store_id,
        from_supplier_id: formData.from_supplier_id,
        ref_code: formData.ref_code || null,
        due_at: formData.due_at ? new Date(formData.due_at).toISOString() : null,
        notes: formData.notes || null,
        created_at: new Date().toISOString() <!-- MISSING_FIELD: FranchisePurchaseOrder.created_at -->
    };

    // 3. Submit to API
    return apiClient.post('/franchise-purchase-orders', payload);
}