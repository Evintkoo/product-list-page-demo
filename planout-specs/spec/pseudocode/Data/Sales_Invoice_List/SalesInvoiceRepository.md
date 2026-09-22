/**
 * Handles data retrieval for the Sales Invoice list.
 * Implements filtering, pagination, and sorting logic.
 */
function getSalesInvoices(query: SalesInvoiceListQuery): SalesInvoiceListResponse {
    // 1. Construct base query from SalesInvoice entity
    let dbQuery = Database.table("SalesInvoice");

    // 2. Apply Search Filter
    if (query.search_term) {
        dbQuery = dbQuery.where("invoice_number", "LIKE", `%${query.search_term}%`)
                         .orWhere("customer_name", "LIKE", `%${query.search_term}%`);
    }

    // 3. Apply Sorting
    const sortBy = query.sort_by || "issue_date";
    const sortOrder = query.sort_order || "DESC";
    dbQuery = dbQuery.orderBy(sortBy, sortOrder);

    // 4. Apply Pagination
    const page = query.page || 1;
    const pageSize = query.page_size || 20;
    const offset = (page - 1) * pageSize;

    const totalCount = dbQuery.count();
    const results = dbQuery.limit(pageSize).offset(offset).fetchAll();

    // 5. Return mapped response
    return {
        data: results,
        total_count: totalCount,
        page: page,
        page_size: pageSize
    };
}