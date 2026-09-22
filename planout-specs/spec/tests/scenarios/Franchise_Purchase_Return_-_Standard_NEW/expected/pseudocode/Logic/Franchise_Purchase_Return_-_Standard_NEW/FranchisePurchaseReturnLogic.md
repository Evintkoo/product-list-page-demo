/**
 * Initializes the form state and fetches necessary lookup data.
 */
async function initializePage() {
    // Verify authentication
    const user = await fetch("/api/auth/me");
    if (!user) {
        redirectTo("/login");
        return;
    }

    // Generate unique ID for the new return document
    const formId = generateUUID();

    // Load dropdown options
    const stores = await fetch("/api/stores");
    const suppliers = await fetch("/api/suppliers?is_internal=true");

    return {
        formId,
        stores,
        suppliers
    };
}

/**
 * Handles the submission of the Franchise Purchase Return form.
 */
async function handleSave(formData) {
    const payload = {
        sender_location_id: formData.return_from,
        receiver_location_id: formData.return_to_supplier,
        source_order_id: formData.franchise_purchase_order,
        document_no: formData.document_no,
        reference_no: formData.reference_no,
        notes: formData.notes,
        items: formData.items.map(item => ({
            product_id: item.product_id,
            store_qty: item.store_qty,
            order_qty: item.order_qty,
            max_return_qty: item.max_return_qty,
            return_qty: item.return_qty,
            reason: item.reason
        }))
    };

    const response = await fetch("/franchise_purchase_returns", {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (response.status === 201) {
        const data = await response.json();
        // Redirect to details page with draft status
        redirectTo(`/franchise-purchase-returns/${data.id}?state=Draft`);
    }
}

/**
 * Fetches Franchise Purchase Order options on-demand.
 */
async function searchPurchaseOrders(query, storeId, supplierId) {
    if (query.length < 3) return [];
    
    return await fetch(`/api/franchise-purchase-orders?q=${query}&store_id=${storeId}&supplier_id=${supplierId}`);
}