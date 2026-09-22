/**
 * Controller to handle retrieval of payment type mappings.
 * Orchestrates the request validation and service layer execution.
 */
FUNCTION GET_PAYMENT_TYPE_MAPPINGS(request):
    // Extract query parameters
    SET company_id = request.query.company_id
    SET store_id = request.query.store_id OR NULL
    SET payment_type_id = request.query.payment_type_id OR NULL
    SET is_active = request.query.is_active OR NULL
    SET limit = request.query.limit OR 50
    SET offset = request.query.offset OR 0

    // Call service to fetch data
    SET results = FETCH_PAYMENT_TYPE_MAPPINGS(company_id, store_id, payment_type_id, is_active, limit, offset)
    
    // Return formatted response
    RETURN {
        "payment_type_mappings": results.data,
        "metadata": {
            "total": results.total_count,
            "limit": limit,
            "offset": offset
        }
    }