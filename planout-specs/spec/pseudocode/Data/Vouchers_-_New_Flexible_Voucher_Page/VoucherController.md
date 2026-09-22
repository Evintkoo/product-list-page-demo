/**
 * API Controller for /api/vouchers/flexible
 */

POST /api/vouchers/flexible(request_body):
    TRY:
        // Delegate to repository
        result = createFlexibleVoucher(request_body)
        RETURN HTTP_201_CREATED(result)
    CATCH error:
        RETURN HTTP_400_BAD_REQUEST(error.message)