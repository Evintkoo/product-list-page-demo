/**
 * Service layer to interact with the database for PurchaseOrder entities.
 */
function find(companyId, filters, pagination, sorting) {
    // Build query base
    let query = Database.table("PurchaseOrder").where("company_id", "=", companyId);

    // Apply filters
    if (filters.order_type) query.where("order_type", "=", filters.order_type);
    if (filters.is_fixed_asset !== undefined) query.where("is_fixed_asset", "=", filters.is_fixed_asset);
    if (filters.workflow_state) query.where("workflow_state", "=", filters.workflow_state);
    
    if (filters.created_at_from) query.where("created_at", ">=", filters.created_at_from);
    if (filters.created_at_to) query.where("created_at", "<=", filters.created_at_to);

    // Apply sorting
    query.orderBy(sorting.sortBy, sorting.sortOrder);

    // Apply pagination
    query.limit(pagination.limit).offset(pagination.offset);

    // Execute
    return query.fetchAll();
}