/**
 * Handles the retrieval of Purchase Returns for the authenticated company.
 */
FUNCTION GET_PurchaseReturns(request):
    // 1. Authentication & Authorization
    user = GET_SessionUser()
    IF NOT user.isAuthenticated:
        RETURN 401 Unauthorized
    
    IF NOT user.hasPermission("view_purchase_returns"):
        RETURN 403 Forbidden

    // 2. Extract and Validate Query Parameters
    params = request.query
    page = params.page OR 1
    limit = params.limit OR 20
    sort_by = params.sort_by OR "created_at"
    sort_order = params.sort_order OR "DESC"
    
    // Optional filters
    is_fixed_asset = params.is_fixed_asset <!-- MISSING_FIELD: PurchaseReturn.is_fixed_asset -->
    return_type = params.return_type <!-- MISSING_FIELD: PurchaseReturn.return_type -->
    warehouse_id = params.warehouse_id <!-- MISSING_FIELD: PurchaseReturn.warehouse_id -->

    // 3. Data Retrieval
    // Scope is implicitly handled by the company_id associated with the session user
    query = DB.PurchaseReturn.SELECT(*)
    
    // Apply filters
    IF is_fixed_asset IS NOT NULL:
        query = query.WHERE("is_fixed_asset", "=", is_fixed_asset)
    
    IF return_type IS NOT NULL:
        query = query.WHERE("return_type", "=", return_type)
        
    IF warehouse_id IS NOT NULL:
        query = query.WHERE("warehouse_id", "=", warehouse_id)

    // Apply pagination and sorting
    results = query.ORDER_BY(sort_by, sort_order)
                   .OFFSET((page - 1) * limit)
                   .LIMIT(limit)
                   .EXECUTE()

    // 4. Response
    RETURN 200 OK, results