/**
 * Handles the retrieval of the Chart of Accounts for dropdown selection.
 * Scoped to the authenticated user's company.
 */
function getAccounts(request) {
    // 1. Authentication Check
    const user = Auth.getCurrentUser();
    if (!user) {
        return Response.error("Unauthorized", 401);
    }

    // 2. Extract and Validate Query Parameters
    const search = request.query.search; // Optional
    const accountType = request.query.account_type; // Optional
    const limit = parseInt(request.query.limit) || 100;
    const offset = parseInt(request.query.offset) || 0;

    if (limit < 0 || offset < 0) {
        return Response.error("Invalid pagination parameters", 400);
    }

    // 3. Fetch Data via Service
    try {
        const accounts = AccountService.findAccounts({
            company_id: user.company_id,
            search: search,
            account_type: accountType,
            limit: limit,
            offset: offset
        });
        
        return Response.success(accounts, 200);
    } catch (error) {
        return Response.error("Internal Server Error", 500);
    }
}