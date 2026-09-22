/**
 * Handles the GET /api/sales/ecommerce request.
 * Orchestrates the retrieval of ecommerce sales data.
 */
function getEcommerceSales(request) {
    // 1. Validate Session
    if (!request.session.isValid()) {
        return response(401, { error: "Unauthorized" });
    }

    // 2. Extract and Sanitize Query Parameters
    const filters = {
        limit: parseInt(request.query.limit) || 20,
        offset: parseInt(request.query.offset) || 0,
        customer_id: request.query.customer_id, // <!-- MISSING_FIELD: Sale.customer_id validation -->
        status: request.query.status
    };

    // 3. Execute Query via Service
    try {
        const sales = SaleService.listEcommerceSales(filters);
        return response(200, sales);
    } catch (error) {
        if (error.isValidationError) {
            return response(400, { error: error.message });
        }
        return response(500, { error: "Internal Server Error" });
    }
}