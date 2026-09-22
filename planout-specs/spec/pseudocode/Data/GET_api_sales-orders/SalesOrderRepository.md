/**
 * Executes the paginated query for Sales Orders scoped to the authenticated company.
 * 
 * @param companyId - The ID of the company from the authenticated session.
 * @param filters - Object containing optional filter criteria (document_number, purchase_order_number, from_date, to_date, warehouse_id, customer, salesperson, status).
 * @param pagination - Object containing limit, offset, sort, and direction.
 * @returns A list of SalesOrder records and the total count for pagination metadata.
 */
function findSalesOrders(companyId, filters, pagination) {
    // 1. Build base query scoped to company_id
    let query = DB.table("SalesOrder").where("company_id", "=", companyId);

    // 2. Apply dynamic filters
    if (filters.document_number) query.where("document_number", "LIKE", `%${filters.document_number}%`);
    if (filters.purchase_order_number) query.where("purchase_order_number", "=", filters.purchase_order_number);
    if (filters.from_date) query.where("created_at", ">=", filters.from_date);
    if (filters.to_date) query.where("created_at", "<=", filters.to_date);
    if (filters.warehouse_id) query.where("warehouse_id", "=", filters.warehouse_id);
    if (filters.customer) query.where("customer", "ILIKE", `%${filters.customer}%`);
    if (filters.salesperson) query.where("salesperson", "ILIKE", `%${filters.salesperson}%`);
    if (filters.status) query.where("status", "=", filters.status);

    // 3. Apply sorting
    query.orderBy(pagination.sort, pagination.direction);

    // 4. Apply pagination
    query.limit(pagination.limit).offset(pagination.offset);

    // 5. Execute and return results
    return {
        data: query.fetchAll(),
        total: query.count()
    };
}