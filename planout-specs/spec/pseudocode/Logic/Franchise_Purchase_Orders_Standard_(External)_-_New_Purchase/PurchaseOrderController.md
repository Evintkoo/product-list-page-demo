/**
 * Endpoint: POST /api/franchise-purchase-orders/external
 */
FUNCTION handleCreateExternalPurchaseOrder(request):
    TRY:
        result = createExternalPurchaseOrder(request.body)
        RETURN HTTP 201, result
    CATCH error:
        RETURN HTTP 422, { "error": error.message }