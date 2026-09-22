/**
 * Controller to handle retrieval of franchise purchase returns.
 * Ensures data isolation by company_id and filters by franchise-specific types.
 */
function getFranchisePurchaseReturns(request) {
    // 1. Authentication Check
    const user = authenticate(request);
    if (!user) throw new UnauthorizedError();

    // 2. Extract and Validate Query Parameters
    const filters = {
        page: request.query.page || 1,
        limit: request.query.limit || 20,
        workflow_state: request.query.workflow_state,
        store_id: request.query.store_id,
        supplier_id: request.query.supplier_id,
        warehouse_id: request.query.warehouse_id,
        ref_code_start: request.query.ref_code_start,
        order_ref_code_start: request.query.order_ref_code_start,
        created_at_gt: request.query.created_at_gt,
        created_at_lt: request.query.created_at_lt
    };

    // 3. Execute Query
    try {
        const results = StockReturnService.findFranchiseReturns(user.company_id, filters);
        return { status: 200, body: results };
    } catch (error) {
        return { status: 500, body: { error: "Internal Server Error" } };
    }
}