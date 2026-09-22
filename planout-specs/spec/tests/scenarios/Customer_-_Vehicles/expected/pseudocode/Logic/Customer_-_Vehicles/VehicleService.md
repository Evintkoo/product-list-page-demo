/**
 * Orchestrates the page load and filter application logic.
 */
function initializeVehiclePage() {
    // Default state: Active vehicles
    const defaultFilter = { is_active: true };
    return fetchVehicles(defaultFilter);
}

function fetchVehicles(filters) {
    // Calls GET /api/vehicles with query params
    // Maps response fields to UI columns as defined in mapping rules
    return API.get('/api/vehicles', { params: filters });
}

function handleStatusTabChange(status) {
    // Triggered by Active/Inactive tabs
    // status: boolean
    return fetchVehicles({ is_active: status });
}