/**
 * Initializes the page by verifying authentication and fetching the initial list.
 */
async function initializePage() {
    const auth = await fetch("/api/auth/me");
    if (auth.status === 401) {
        redirectTo("/login");
        return;
    }

    // Initial load with default pagination
    const initialOrders = await fetchStockOrders({
        source_type: "stock_order",
        limit: 20,
        offset: 0
    });
    
    updateTable(initialOrders);
}

/**
 * Fetches stock orders based on provided filters.
 */
async function fetchStockOrders(filters) {
    const queryParams = new URLSearchParams({
        source_type: "stock_order",
        ...filters
    });

    const response = await fetch(`/api/stock-orders?${queryParams.toString()}`);
    return await response.json();
}

/**
 * Maps raw API data to the UI table structure.
 */
function mapStockOrderToRow(order) {
    return {
        id: order.id,
        ref_code: order.ref_code,
        supplier_ref_code: order.supplier_ref_code, <!-- MISSING_FIELD: StockOrder.supplier_ref_code -->
        created_at: formatDate(order.created_at),
        due_at: formatDate(order.due_at), <!-- MISSING_FIELD: StockOrder.due_at -->
        received_at: order.received_at ? formatDate(order.received_at) : null, <!-- MISSING_FIELD: StockOrder.received_at -->
        store_name: order.store_name, <!-- MISSING_FIELD: StockOrder.store_name -->
        warehouse_name: order.warehouse_name, <!-- MISSING_FIELD: StockOrder.warehouse_name -->
        workflow_state: order.workflow_state,
        order_amount: formatCurrency(order.order_amount), <!-- MISSING_FIELD: StockOrder.order_amount -->
        receive_amount: formatCurrency(order.receive_amount), <!-- MISSING_FIELD: StockOrder.receive_amount -->
        created_by: order.created_by <!-- MISSING_FIELD: StockOrder.created_by -->
    };
}

/**
 * Handles the Search button click event.
 */
function handleSearch(filterState) {
    const activeFilters = {};
    
    // Only include filters that have values
    Object.keys(filterState).forEach(key => {
        if (filterState[key]) {
            activeFilters[key] = filterState[key];
        }
    });

    const results = fetchStockOrders(activeFilters);
    updateTable(results);
}

function updateTable(data) {
    const rows = data.map(mapStockOrderToRow);
    renderTableRows(rows);
}