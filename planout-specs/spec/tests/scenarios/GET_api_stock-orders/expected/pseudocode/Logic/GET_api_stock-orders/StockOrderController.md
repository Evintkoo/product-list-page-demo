/**
 * Controller for handling Stock Order retrieval requests.
 */
function getStockOrders(request, response) {
    // 1. Authentication Check
    const user = authenticateUser(request);
    if (!user) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    // 2. Extract and Validate Query Parameters
    const { source_type, page = 1, limit = 20, sort_by = "created_at", sort_order = "desc" } = request.query;

    if (!source_type) {
        return response.status(400).json({ error: "source_type is required" });
    }

    // 3. Delegate to Service Layer
    try {
        const result = StockOrderService.fetchList({
            company_id: user.company_id,
            source_type,
            page,
            limit,
            sort_by,
            sort_order
        });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}