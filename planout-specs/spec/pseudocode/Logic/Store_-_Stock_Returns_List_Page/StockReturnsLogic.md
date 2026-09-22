/**
 * Handles the initialization and filtering logic for the Stock Returns List Page.
 */

// 1. Initialization
// On page load, verify authentication. If valid, fetch initial list:
async function loadStockReturnsPage() {
    if (!isAuthenticated()) {
        redirectToLogin();
        return;
    }
    return await fetchStockReturns({});
}

// 2. Search & Filter Logic
// Triggered by the "Search" button click.
async function handleSearch(filters: {
    ref_code?: string,
    warehouse_id?: string,
    store_id?: string,
    from_date?: string,
    to_date?: string,
    workflow_state?: string
}) {
    // Validation: Date range check
    if (filters.from_date && filters.to_date) {
        if (new Date(filters.from_date) > new Date(filters.to_date)) {
            throwAlert("from date cannot be greater than to date");
            return;
        }
    }

    return await fetchStockReturns(filters);
}

// 3. Data Fetching
async function fetchStockReturns(params) {
    // Calls GET /api/stock-returns with query parameters
    // Maps response fields to UI components:
    // ref_code -> Stock Return
    // created_at -> Date
    // sent_at -> Sent At
    // approved_at -> Approved Date
    // from_store_name -> From Store
    // warehouse_name -> Warehouse
    // workflow_state -> Status
    // created_by -> User
}

// 4. Helper Data Fetching
async function getFilterOptions() {
    // Fetches data for dropdowns
    const stores = await fetch("/api/stores"); // GET /api/stores
    const warehouses = await fetch("/api/warehouses"); // GET /api/warehouses
    return { stores, warehouses };
}