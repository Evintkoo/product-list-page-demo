/**
 * Search customers for the "To Customer" type-ahead field.
 */
function searchCustomers(query) {
    // Maps to Search Customer API
    return apiClient.get(`/api/customers/search?q=${encodeURIComponent(query)}`);
}