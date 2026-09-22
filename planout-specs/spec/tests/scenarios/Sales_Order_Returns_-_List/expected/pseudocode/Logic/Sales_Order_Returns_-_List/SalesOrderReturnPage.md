/**
 * Page component logic for /sales_order_returns
 */

useEffect(() => {
    // Check authentication
    API.get("/auth/me")
        .then(() => {
            // If authorized, fetch initial list with empty filters
            fetchReturns({});
        })
        .catch(() => {
            // Redirect to Login if unauthorized
            window.location.href = "/login";
        });
}, []);

function fetchReturns(filters) {
    const data = getSalesOrderReturns(filters);
    updateTableState(data);
}