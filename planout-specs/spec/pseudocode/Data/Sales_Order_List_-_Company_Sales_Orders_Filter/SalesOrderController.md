/**
 * API Controller for GET /api/sales-orders
 */
FUNCTION handleGetSalesOrders(request):
    // Extract parameters from request query string
    params = {
        document_number: request.query.document_number,
        purchase_order_number: request.query.purchase_order_number,
        from_date: request.query.from_date,
        to_date: request.query.to_date,
        warehouse_id: request.query.warehouse_id,
        customer: request.query.customer,
        salesperson: request.query.salesperson,
        status: request.query.status,
        limit: request.query.limit OR 20,
        offset: request.query.offset OR 0
    }

    // Call repository
    results = fetchSalesOrders(params)

    // Return 200 OK with serialized results
    RETURN Response.json(results, 200)