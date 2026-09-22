/**
 * API Controller for Purchase Return endpoints.
 */

ENDPOINT GET /api/purchase-returns:
    TRY:
        data = PurchaseReturnRepository.getPurchaseReturnsList()
        RETURN HTTP 200 OK with JSON body { "data": data }
    CATCH error:
        RETURN HTTP 500 Internal Server Error with { "message": "Failed to fetch purchase returns" }