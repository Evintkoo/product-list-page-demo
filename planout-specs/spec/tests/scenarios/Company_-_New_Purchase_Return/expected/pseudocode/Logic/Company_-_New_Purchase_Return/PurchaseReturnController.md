/**
 * Handles the creation of a new Purchase Return.
 * Orchestrates the validation of form data and persistence of the return document
 * and its associated line items.
 */
function handleCreatePurchaseReturn(formData) {
    // 1. Validate required fields
    if (!formData.return_type || !formData.supplier_id || !formData.invoice_id) {
        throw new Error("Missing required fields for Purchase Return");
    }

    // 2. Calculate totals based on current item list
    const calculatedSubtotal = formData.products.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const calculatedTotal = calculatedSubtotal - formData.discount + formData.tax;

    // 3. Prepare payload for API
    const payload = {
        reference_number: formData.reference_number,
        return_type: formData.return_type,
        supplier_id: formData.supplier_id,
        warehouse_id: formData.warehouse_id,
        invoice_id: formData.invoice_id,
        purchase_order_id: formData.purchase_order_id,
        notes: formData.notes,
        subtotal: calculatedSubtotal,
        discount: formData.discount,
        tax: formData.tax,
        total: calculatedTotal,
        items: formData.products.map(item => ({
            product_id: item.product_id,
            price: item.price,
            qty: item.qty,
            reason: item.reason
        }))
    };

    // 4. Call API
    return api.post("/purchase-returns", payload)
        .then(response => {
            // Navigate to list page upon success
            router.push("/purchase-returns");
            return response;
        })
        .catch(error => {
            handleApiError(error);
        });
}