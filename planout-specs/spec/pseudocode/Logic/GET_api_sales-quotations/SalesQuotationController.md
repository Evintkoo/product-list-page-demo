/**
 * Controller for handling GET /api/sales-quotations
 * Scopes data to the authenticated user's company_id.
 */
function getSalesQuotations(request) {
    const { 
        document_number, 
        sales_order_id, 
        customer, 
        status, 
        limit = 20, 
        offset = 0 
    } = request.query;

    const companyId = request.user.company_id;

    // Build query filters
    const filters = {
        company_id: companyId
    };

    if (document_number) {
        filters.document_number = { operator: "STARTS_WITH", value: document_number };
    }

    if (sales_order_id) {
        filters.sales_order_id = sales_order_id;
    }

    if (customer) {
        filters.customer_name = { operator: "CONTAINS", value: customer };
    }

    if (status) {
        filters.workflow_state = status;
    }

    // Execute query via Service
    const result = SalesQuotationService.fetchList(filters, { limit, offset });

    return {
        status: 200,
        body: result
    };
}