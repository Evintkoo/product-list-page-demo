/**
 * Controller to handle retrieval of SalesDelivery records.
 */
function getSalesDeliveries(request) {
    // 1. Validate authentication
    if (!request.isAuthenticated()) {
        return respond(401, { error: "Unauthorized" });
    }

    // 2. Extract optional filters from query parameters
    const { order_id } = request.query;

    try {
        // 3. Fetch records from the database
        const deliveries = SalesDeliveryService.findAll({ order_id });

        // 4. Handle empty results
        if (!deliveries || deliveries.length === 0) {
            return respond(404, { error: "No matching delivery records found" });
        }

        // 5. Return successful response
        return respond(200, deliveries);
    } catch (error) {
        // 6. Handle unexpected server errors
        return respond(500, { error: "Internal Server Error" });
    }
}