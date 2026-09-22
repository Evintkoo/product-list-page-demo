/**
 * Controller for handling requests related to Payment Type Mappings.
 */
FUNCTION GET_PaymentTypeMappings(request):
    // 1. Authentication & Authorization
    // Extract company_id from the authenticated user session
    SET current_company_id = Auth.getAuthenticatedUser().company_id

    // 2. Extract and Validate Query Parameters
    SET store_id = request.query.store_id
    SET payment_type_id = request.query.payment_type_id
    SET is_active = request.query.is_active
    SET limit = request.query.limit OR 20
    SET offset = request.query.offset OR 0

    // 3. Invoke Service Layer
    SET result = PaymentTypeMappingService.listMappings(
        company_id: current_company_id,
        filters: {
            store_id: store_id,
            payment_type_id: payment_type_id,
            is_active: is_active
        },
        pagination: { limit: limit, offset: offset }
    )

    RETURN 200 OK with result