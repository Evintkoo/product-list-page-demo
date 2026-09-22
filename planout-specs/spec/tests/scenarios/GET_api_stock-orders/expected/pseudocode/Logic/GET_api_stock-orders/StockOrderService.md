/**
 * Service for querying StockOrder entities.
 */
function fetchList(filters) {
    // Define non-sortable fields as per requirements
    const forbiddenSortFields = ["order_amount", "receive_amount"];
    if (forbiddenSortFields.includes(filters.sort_by)) {
        throw new Error("Invalid sort field");
    }

    // Build Query
    // Scope to company_id (from authenticated user)
    let query = Database.StockOrder.find({
        company_id: filters.company_id,
        source_type: filters.source_type
    });

    // Apply Sorting
    query = query.orderBy(filters.sort_by, filters.sort_order);

    // Apply Pagination
    const offset = (filters.page - 1) * filters.limit;
    const data = query.limit(filters.limit).offset(offset).execute();

    return {
        data: data,
        meta: {
            page: filters.page,
            limit: filters.limit
        }
    };
}