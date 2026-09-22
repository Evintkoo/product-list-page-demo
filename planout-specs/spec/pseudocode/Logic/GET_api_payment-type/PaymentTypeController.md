/**
 * Controller to handle retrieval of Payment Types.
 * Scoped to the authenticated user's company.
 */
function getPaymentTypes(request) {
    // 1. Extract and validate query parameters
    const { is_active, kind, limit, offset } = request.query;
    const companyId = request.user.company_id;

    // 2. Validate pagination defaults
    const pageSize = parseInt(limit) || 20;
    const pageOffset = parseInt(offset) || 0;

    // 3. Delegate to service layer
    try {
        const result = PaymentTypeService.list(companyId, {
            is_active,
            kind,
            limit: pageSize,
            offset: pageOffset
        });
        
        return response.status(200).json(result);
    } catch (error) {
        return response.status(400).json({ error: "Invalid query parameters" });
    }
}