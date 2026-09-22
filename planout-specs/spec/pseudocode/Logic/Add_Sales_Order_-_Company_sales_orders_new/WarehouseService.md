/**
 * Fetches available warehouses for the "From Warehouse" dropdown.
 */
function getWarehouses() {
    // Maps to GET /api/warehouses
    return apiClient.get("/api/warehouses");
}