/**
 * API Controller for /api/sales-invoices
 */
function handleGetSalesInvoices(request) {
    // Extract query parameters
    const queryParams: SalesInvoiceListQuery = {
        search_term: request.query.search_term,
        page: parseInt(request.query.page) || 1,
        page_size: parseInt(request.query.page_size) || 20,
        sort_by: request.query.sort_by,
        sort_order: request.query.sort_order
    };

    // Fetch data from repository
    const response = getSalesInvoices(queryParams);

    // Return JSON response
    return Response.json(response);
}