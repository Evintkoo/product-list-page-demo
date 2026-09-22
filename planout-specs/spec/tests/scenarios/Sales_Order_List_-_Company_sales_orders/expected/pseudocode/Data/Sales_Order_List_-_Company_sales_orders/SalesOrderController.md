/**
 * API Endpoint: GET /api/sales-orders
 * Maps incoming request parameters to the repository query.
 */
ENDPOINT GET /api/sales-orders(params):
    // Default values for initial page load
    SET defaultParams = {
        limit: 20,
        offset: 0,
        sort: "created_at",
        direction: "desc"
    }

    // Merge incoming params with defaults
    SET query = MERGE(defaultParams, params)

    // Execute repository call
    SET results = CALL getSalesOrders(query)

    // Return 200 OK with the list of SalesOrders
    RETURN 200 OK, results