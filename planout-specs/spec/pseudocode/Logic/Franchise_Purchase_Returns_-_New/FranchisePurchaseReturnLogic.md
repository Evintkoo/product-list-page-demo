/**
 * Initializes the page state for Franchise Purchase Returns
 */
async function initializePage() {
    // Load dropdown data
    const stores = await fetch("/api/stores");
    const suppliers = await fetch("/api/suppliers?is_internal=true");
    
    // Set default return type to 'internal'
    const returnType = "internal";
    
    return { stores, suppliers, returnType };
}

/**
 * Handles the search for Franchise Purchase Orders
 * Triggered after 3 characters are typed and store/supplier are selected
 */
async function searchPurchaseOrders(query, storeId, supplierId) {
    if (query.length < 3 || !storeId || !supplierId) return [];
    
    return await fetch(`/api/franchise-purchase-orders?q=${query}&store_id=${storeId}&supplier_id=${supplierId}`);
}

/**
 * Submits the Purchase Return form
 */
async function submitPurchaseReturn(formData) {
    const payload = {
        sender_location_id: formData.sender_location_id,
        receiver_location_id: formData.receiver_location_id,
        receiver_location_type: "supplier",
        purchase_order_id: formData.purchase_order_id,
        notes: formData.notes,
        type: "internal",
        workflow_state: "draft",
        items: formData.items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity
        }))
    };

    const response = await fetch("/api/purchase-returns", {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        // Redirect to confirmed state page
        navigateTo("/purchase-returns/confirmed");
    }
}