/**
 * API Controller for GET /api/stock-orders/:id
 */
FUNCTION handleGetStockOrder(request):
    TRY
        // Extract context from session
        SET user = request.session.user
        SET orderId = request.params.id

        // Execute service logic
        SET data = fetchStockOrderDetail(orderId, user)

        // Return 200 OK with the Stock Order Detail Response Shape
        RETURN Response(200, data)

    CATCH error:
        // Map internal errors to standard API responses
        IF error.code == "INVALID_ID_FORMAT" THEN
            RETURN Response(400, { message: "Invalid ID format" })
        ELSE IF error.code == "STOCK_ORDER_NOT_FOUND" THEN
            RETURN Response(404, { message: "Stock order not found" })
        ELSE
            RETURN Response(500, { message: "Internal server error" })
        END IF
    END TRY