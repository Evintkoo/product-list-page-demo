/**
 * Controller to handle retrieval of franchise purchase returns.
 */
function getFranchisePurchaseReturns(request) {
    // 1. Validate Authentication
    const user = authenticateRequest(request);
    if (!user) return sendError(401, "Unauthorized");

    // 2. Extract and Validate Query Parameters
    const { franchiseId, startDate, endDate, page = 1, limit = 20 } = request.query;

    if (!franchiseId) {
        return sendError(400, "franchiseId is required");
    }

    // 3. Authorization Check
    // Ensure the authenticated user has access to the requested franchise
    if (!user.hasAccessToFranchise(franchiseId)) {
        return sendError(403, "Forbidden: Access denied to this franchise");
    }

    // 4. Fetch Data via Service
    try {
        const returns = FranchisePurchaseReturnService.findReturns({
            franchise_id: franchiseId,
            startDate,
            endDate,
            page,
            limit
        });

        if (!returns) {
            return sendError(404, "No records found");
        }

        return sendResponse(200, returns);
    } catch (error) {
        return sendError(500, "Internal Server Error");
    }
}