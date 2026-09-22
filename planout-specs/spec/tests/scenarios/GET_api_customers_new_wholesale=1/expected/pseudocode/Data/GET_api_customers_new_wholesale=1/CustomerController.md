/**
 * Controller for GET /api/customers/new?wholesale=1
 */
function handleGetNewWholesaleCustomer(request) {
    try {
        // Validate session/auth
        if (!request.session.isValid()) {
            return Response.error(401, "Unauthorized");
        }

        // Validate query param
        if (request.query.wholesale !== "1") {
            return Response.error(400, "Invalid request parameters");
        }

        // Fetch data
        const data = CustomerDataService.getNewWholesaleCustomerBootstrap();
        
        return Response.success(200, data);
    } catch (error) {
        // Log error internally
        Logger.error("Failed to fetch wholesale customer form data", error);
        return Response.error(500, "Internal Server Error");
    }
}