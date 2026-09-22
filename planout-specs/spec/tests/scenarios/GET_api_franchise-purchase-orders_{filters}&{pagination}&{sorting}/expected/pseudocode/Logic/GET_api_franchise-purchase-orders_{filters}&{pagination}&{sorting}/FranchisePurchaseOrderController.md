/**
 * Controller for handling Franchise Purchase Order retrieval.
 * Scopes data to the authenticated user's company_id.
 */
function getFranchisePurchaseOrders(request) {
    // 1. Extract and validate authentication context
    const companyId = request.user.company_id; <!-- MISSING_FIELD: User.company_id -->
    
    // 2. Parse and validate query parameters
    const { 
        status, 
        order_type, 
        created_at_from, 
        created_at_to, 
        limit = 20, 
        offset = 0, 
        sort_by = 'created_at', 
        sort_order = 'desc' 
    } = request.query;

    // Validate date ranges
    if (created_at_from && created_at_to && new Date(created_at_from) > new Date(created_at_to)) {
        return respond(422, { error: "created_at_from cannot be later than created_at_to" });
    }

    // 3. Delegate to Service Layer
    try {
        const result = FranchisePurchaseOrderService.list({
            companyId,
            filters: { status, order_type, created_at_from, created_at_to },
            pagination: { limit, offset },
            sorting: { sort_by, sort_order }
        });
        
        return respond(200, result);
    } catch (error) {
        return respond(500, { error: "Internal Server Error" });
    }
}