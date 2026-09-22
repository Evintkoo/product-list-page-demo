/**
 * Handles the retrieval of Purchase Orders based on filters, pagination, and sorting.
 * Scope is restricted to the company_id retrieved from the authenticated session.
 */
function getPurchaseOrders(request) {
    // 1. Extract session context
    const companyId = session.get("company_id");
    
    // 2. Extract and validate query parameters
    const filters = {
        order_type: request.query.order_type,
        is_fixed_asset: request.query.is_fixed_asset,
        workflow_state: request.query.workflow_state,
        created_at_from: request.query.created_at_from,
        created_at_to: request.query.created_at_to
    };

    const pagination = {
        limit: parseInt(request.query.limit) || 20,
        offset: parseInt(request.query.offset) || 0
    };

    const sorting = {
        sortBy: request.query.sort_by || "created_at",
        sortOrder: request.query.sort_order || "DESC"
    };

    // 3. Validate business logic constraints
    if (filters.created_at_from && filters.created_at_to && (filters.created_at_from > filters.created_at_to)) {
        return response.error(422, "created_at_from cannot be later than created_at_to");
    }

    // 4. Delegate to Service Layer
    const results = PurchaseOrderService.find(companyId, filters, pagination, sorting);

    return response.ok(results);
}