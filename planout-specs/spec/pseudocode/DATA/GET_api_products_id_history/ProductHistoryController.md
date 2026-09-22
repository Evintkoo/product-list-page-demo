/**
 * Controller layer to handle the GET /api/products/:id/history request
 */
FUNCTION handleGetProductHistory(request):
    TRY
        // Extract and validate parameters
        SET productId = request.params.id
        SET page = request.query.page OR 1
        SET limit = request.query.limit OR 20

        IF page < 1 OR limit < 1 THEN
            RETURN Response(400, "Invalid pagination parameters")
        END IF

        // Call repository
        SET result = getProductPriceHistory(productId, page, limit)
        
        RETURN Response(200, result)

    CATCH Error e:
        IF e.code == 404 THEN
            RETURN Response(404, e.message)
        ELSE
            RETURN Response(500, "Internal Server Error")
        END IF