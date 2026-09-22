/**
 * Controller for PATCH /api/stock-orders/:id/cancel
 */
FUNCTION handleCancelStockOrderRequest(request):
    TRY:
        SET orderId = request.params.id
        SET currentCompanyId = request.auth.company_id
        SET currentUserId = request.auth.user_id

        // Validate UUID format for :id
        IF NOT IS_VALID_UUID(orderId):
            RETURN Response(400, "Invalid ID format")

        SET result = cancelStockOrder(orderId, currentCompanyId, currentUserId)
        
        RETURN Response(200, result)

    CATCH Error AS e:
        IF e.message CONTAINS "404": RETURN Response(404, e.message)
        IF e.message CONTAINS "409": RETURN Response(409, e.message)
        RETURN Response(500, "Internal Server Error")