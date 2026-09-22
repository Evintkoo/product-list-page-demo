/**
 * Handles the retrieval and filtering of Sales Orders based on user input.
 */
function fetchSalesOrders(query: SalesOrderQuery) {
    // 1. Construct the query parameters object
    // Only include fields that are not null/undefined from the UI state
    const params = {
        document_number: query.document_number,
        purchase_order_number: query.purchase_order_number,
        from_date: query.from_date,
        to_date: query.to_date,
        warehouse_id: query.warehouse_id,
        customer: query.customer,
        salesperson: query.salesperson,
        status: query.status,
        limit: query.limit ?? 20,
        offset: query.offset ?? 0
    };

    // 2. Execute GET request to the API
    // Endpoint: GET /sales-orders
    const response = apiClient.get("/sales-orders", { params });

    // 3. Return the validated list of SalesOrder entities
    return response.data;
}