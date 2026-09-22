/**
 * Controller for handling Stock Order retrieval requests.
 */
function getStockOrderById(request, response) {
    const { id } = request.params;
    const { user } = request; // Assumed authenticated user context

    // 1. Validate ID format
    if (!isValidUuid(id)) {
        return response.status(400).json({ error: "Invalid ID format" });
    }

    // 2. Fetch Stock Order from database
    // Scoped to the company_id of the authenticated user to ensure data isolation
    const stockOrder = database.StockOrder.findOne({
        where: {
            id: id,
            company_id: user.company_id
        }
    });

    // 3. Handle existence and authorization
    // If not found, return 404 (covers both non-existent and unauthorized access)
    if (!stockOrder) {
        return response.status(404).json({ error: "Stock Order not found" });
    }

    // 4. Return the detailed Stock Order object
    return response.status(200).json(stockOrder);
}