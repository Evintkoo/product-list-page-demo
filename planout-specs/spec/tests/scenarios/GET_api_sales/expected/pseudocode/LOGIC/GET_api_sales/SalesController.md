/**
 * Controller for handling retail store sales retrieval.
 * Enforces company and store scoping based on the authenticated session.
 */
function getSales(request, response) {
    // 1. Authentication & Session Context
    const session = getAuthenticatedSession(request);
    if (!session) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    const { company_id, store_id } = session;

    // 2. Extract and Validate Query Parameters
    const limit = parseInt(request.query.limit) || 20;
    const offset = parseInt(request.query.offset) || 0;
    const filters = {
        salesperson_id: request.query.salesperson_id,
        created_at_from: request.query.created_at_from,
        created_at_to: request.query.created_at_to
    };

    // 3. Execute Query via Service
    try {
        const sales = SalesService.findSales({
            company_id,
            store_id,
            limit,
            offset,
            filters
        });
        
        return response.status(200).json(sales);
    } catch (error) {
        if (error.isValidationError) {
            return response.status(400).json({ error: error.message });
        }
        return response.status(500).json({ error: "Internal Server Error" });
    }
}