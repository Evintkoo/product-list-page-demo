/**
 * Handles the initialization and data retrieval for the Stock Reservations page.
 */

// 1. Authentication Check
async function onPageLoad() {
    try {
        await fetch("/api/auth/me");
    } catch (error) {
        // Redirect to Login Page if unauthorized
        window.location.href = "/login";
        return;
    }

    // 2. Load Filter Options
    // Fetch stores to populate the "Select Store" dropdown
    const stores = await fetch("/api/stores");
    
    // 3. Initial Data Fetch
    // Trigger search immediately on load with empty filters
    await fetchStockReservations({});
}

/**
 * Fetches stock reservations based on provided filter criteria.
 * Maps frontend filter fields to API query parameters.
 */
async function fetchStockReservations(filters) {
    const queryParams = new URLSearchParams({
        from_date: filters.from_date || "",
        to_date: filters.to_date || "",
        product_sku: filters.product_sku || "",
        product_name: filters.product_name || "",
        store_id: filters.store_id || ""
    });

    const response = await fetch(`/api/stock-reservations?${queryParams.toString()}`);
    const data = await response.json();

    // Map the response data to the table columns
    return data.map(record => ({
        id: record.id,
        reserve_date: record.reserve_date,
        refcode: record.refcode,
        product_sku: record.product_sku,
        product_name: record.product_name,
        quantity: record.quantity,
        store_name: record.store_name // Derived from joined Store entity
    }));
}