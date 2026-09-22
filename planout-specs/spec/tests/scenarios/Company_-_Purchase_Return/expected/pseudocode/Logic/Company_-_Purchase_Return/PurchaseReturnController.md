/**
 * Handles the initialization and data fetching for the Purchase Return list view.
 */
async function initializePurchaseReturnPage() {
    // 1. Verify authentication
    const user = await fetch("/api/auth/me");
    if (!user.ok) {
        redirectTo("/login");
        return;
    }

    // 2. Initial load: Fetch non-fixed asset purchase returns
    const initialData = await fetchPurchaseReturns({ is_fixed_asset: false });
    renderTable(initialData);
}

/**
 * Fetches purchase returns based on provided filter criteria.
 * Only includes non-empty fields in the query parameters.
 */
async function fetchPurchaseReturns(filters) {
    const queryParams = new URLSearchParams();
    
    // Append filters only if they have values
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, value);
        }
    });

    const response = await fetch(`/api/purchase-returns?${queryParams.toString()}`);
    return await response.json();
}