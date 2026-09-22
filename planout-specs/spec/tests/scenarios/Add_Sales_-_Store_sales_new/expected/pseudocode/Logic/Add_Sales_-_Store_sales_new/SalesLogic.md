/**
 * Initializes the Sales form by fetching necessary reference data.
 */
async function initializeSalesForm() {
    const [users, stores, paymentTypes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/stores'),
        fetch('/api/payment-type')
    ]);
    
    return {
        salespeople: await users.json(),
        registers: await stores.json(),
        paymentTypes: await paymentTypes.json()
    };
}

/**
 * Validates and submits the sale data.
 * @param {Object} formData - The aggregated form state.
 */
async function handleSaveSale(formData) {
    // Validation: Ensure required fields are present
    if (!formData.customer_id || !formData.salesperson_id || !formData.register_id) {
        throw new Error("Customer, Salesperson, and Register are required.");
    }

    // Map form state to API payload
    const payload = {
        customer_id: formData.customer_id,
        salesperson_id: formData.salesperson_id,
        register_id: formData.register_id,
        total_amount: formData.total_amount,
        vehicle_id: formData.vehicle_id,
        discount_total: formData.discount_total,
        tax_total: formData.tax_total,
        promo_code: formData.promo_code,
        ecommerce_ref_code: formData.ecommerce_ref_code,
        notes: formData.notes,
        items: formData.items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            discount_amount: item.discount_amount,
            subtotal: item.subtotal
        })),
        payments: formData.payments.map(payment => ({
            payment_method: payment.payment_method,
            amount: payment.amount
        }))
    };

    const response = await fetch('/api/sale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error("Failed to save sale.");
    }

    return await response.json();
}