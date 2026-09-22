/**
 * Handles the GET /api/suppliers request.
 * Orchestrates authentication, input validation, and data retrieval.
 */
function getSuppliers(request) {
    // 1. Extract authenticated user context
    // Assuming auth middleware provides the company_id
    const companyId = request.user.company_id; 

    // 2. Extract and validate query parameters
    const filters = {
        name: request.query.name,
        status: request.query.status,
        tax_id: request.query.tax_id
    };
    
    const pagination = {
        limit: parseInt(request.query.limit) || 20,
        offset: parseInt(request.query.offset) || 0
    };

    // 3. Delegate to Service layer
    try {
        const suppliers = SupplierService.fetchSuppliers(companyId, filters, pagination);
        return response.status(200).json(suppliers);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}