/**
 * Executes the Sales Invoice List Query.
 * Scopes results to the authenticated user's company_id.
 */
function getSalesInvoices(filters, pagination, userContext) {
    let query = db.table("sales_invoices")
        .where("company_id", "=", userContext.company_id);

    // Apply Filters
    if (filters.document_number) {
        query = query.where("document_number", "LIKE", `${filters.document_number}%`);
    }
    if (filters.sales_order_id) {
        query = query.where("sales_order_id", "=", filters.sales_order_id);
    }
    if (filters.customer) {
        query = query.where("customer_name", "LIKE", `%${filters.customer}%`);
    }
    if (filters.status) {
        query = query.where("workflow_state", "=", filters.status);
    }

    // Get total count for pagination metadata
    const totalCount = query.count();

    // Apply Sorting (Hard-coded default per project requirements)
    query = query.orderBy("created_at", "DESC");

    // Apply Pagination
    const data = query
        .limit(pagination.limit)
        .offset(pagination.offset)
        .fetchAll();

    return {
        data: data,
        total: totalCount
    };
}