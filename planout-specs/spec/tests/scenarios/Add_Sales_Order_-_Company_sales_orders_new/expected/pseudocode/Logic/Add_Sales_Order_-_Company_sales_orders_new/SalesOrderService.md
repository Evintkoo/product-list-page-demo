/**
 * Handles the creation of a new Sales Order.
 * Validates form state before submission and maps UI fields to API schema.
 */
function createSalesOrder(formData) {
    // 1. Validation: Ensure mandatory header fields are present
    if (!formData.customer_id || !formData.warehouse_id) {
        throw new Error("Missing required header information: Customer or Warehouse.");
    }

    // 2. Validation: Ensure at least one item row exists with product and quantity
    const validItems = formData.items.filter(item => item.product_id && item.quantity > 0);
    if (validItems.length === 0) {
        throw new Error("At least one item with a product and quantity is required.");
    }

    // 3. Payload Construction
    const payload = {
        customer_id: formData.customer_id,
        customer_ref_code: formData.customer_ref_code,
        warehouse_id: formData.warehouse_id,
        due_at: formData.due_at,
        // Concatenate address and zip code as per requirements
        delivery_address: `${formData.delivery_address} ${formData.zip_code}`,
        notes: formData.notes,
        items: validItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            discount_type: item.discount_type,
            discount_rate: item.discount_rate,
            unit_discount_amount: item.unit_discount_amount,
            discount_including_tax: item.discount_including_tax
        }))
    };

    // 4. API Submission
    return apiClient.post("/api/sales-orders", payload);
}