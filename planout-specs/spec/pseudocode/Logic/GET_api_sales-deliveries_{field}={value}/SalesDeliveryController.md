/**
 * Controller to handle retrieval of SalesDelivery records based on dynamic query parameters.
 */
function getSalesDeliveries(request) {
    // 1. Extract query parameters from the request
    const queryParams = request.query;
    
    // 2. Validate that at least one valid field is provided
    const allowedFields = [
        "id", "reference_no", "sales_order_id", "sales_invoice_id", 
        "customer_id", "warehouse_id", "status"
    ];
    
    const keys = Object.keys(queryParams);
    if (keys.length === 0 || !keys.every(key => allowedFields.includes(key))) {
        return respond(400, { error: "Invalid or unsupported field parameter provided." });
    }

    // 3. Delegate to Service layer
    try {
        const results = SalesDeliveryService.find(queryParams);
        
        if (results.length === 0) {
            return respond(404, { error: "No records match the given field/value." });
        }
        
        return respond(200, results);
    } catch (error) {
        return respond(500, { error: "Internal server error occurred." });
    }
}