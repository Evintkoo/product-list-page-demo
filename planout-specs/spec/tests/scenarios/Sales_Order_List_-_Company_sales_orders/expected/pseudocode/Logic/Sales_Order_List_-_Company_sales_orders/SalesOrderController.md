/**
 * Handles initial page load logic.
 */
function onPageLoad() {
    const initialQuery = {
        limit: 20,
        offset: 0,
        sort: "created_at",
        direction: "desc"
    };
    
    return fetchSalesOrders(initialQuery);
}

/**
 * Handles filter bar search submission.
 */
function onSearch(filters: Partial<SalesOrderListQuery>) {
    const query = {
        ...filters,
        limit: 20,
        offset: 0
    };
    
    return fetchSalesOrders(query);
}