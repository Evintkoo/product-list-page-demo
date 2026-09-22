/**
 * Fetches the list of sales invoices based on provided query parameters.
 * Handles the interaction with the backend API and ensures data consistency.
 */
function fetchSalesInvoices(query: SalesInvoiceListQuery) {
    // Construct query string from SalesInvoiceListQuery fields
    const params = {
        search_term: query.search_term,
        page: query.page || 1,
        page_size: query.page_size || 20,
        sort_by: query.sort_by || "issue_date",
        sort_order: query.sort_order || "desc"
    };

    return api.get("/api/sales-invoices", { params });
}