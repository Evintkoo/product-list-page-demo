/**
 * Fetches the initial list of franchise customers on page load.
 * Filters results by type = 'FRANCHISE'.
 */
function getFranchiseList() {
    return API.get("/customers/franchise");
}

/**
 * Executes a filtered search based on user input from the filter bar.
 * Only non-null/non-empty parameters are sent in the query string.
 */
function searchFranchiseCustomers(filters) {
    // Filters: customer_group_id, store_id, is_active, customer_code, 
    // tax_no, birthdate, phone, address
    return API.get("/customers/franchise/search", { params: filters });
}

/**
 * Updates the status of a specific customer to inactive.
 */
function deactivateCustomer(customerId) {
    return API.patch(`/customers/${customerId}/deactivate`, {
        status: "INACTIVE"
    });
}