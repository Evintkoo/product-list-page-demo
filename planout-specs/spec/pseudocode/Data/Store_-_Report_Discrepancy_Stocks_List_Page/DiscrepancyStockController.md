/**
 * API Handler for GET /api/discrepancy-stocks
 * Validates session and returns formatted discrepancy data.
 */
async function handleGetDiscrepancyStocks(request) {
    // 1. Verify session via /api/auth/me
    const user = await authService.getCurrentUser(request.headers.authorization);
    if (!user) {
        throw new UnauthorizedError("User session invalid");
    }

    // 2. Extract pagination parameters
    const limit = parseInt(request.query.limit) || 20;
    const offset = parseInt(request.query.offset) || 0;
    const filters = {
        status: request.query.status
    };

    // 3. Fetch data from repository
    const data = await getDiscrepancyStocks(limit, offset, filters);

    // 4. Return standardized response
    return {
        status: 200,
        body: {
            items: data,
            pagination: {
                limit,
                offset,
                total: await countDiscrepancyStocks(filters)
            }
        }
    };
}