/**
 * API Endpoint: POST /api/sales-orders
 * Maps the incoming JSON payload to the repository layer.
 */

FUNCTION handleCreateSalesOrder(request):
    // Validate required fields
    IF request.body.customer_id IS NULL OR request.body.items IS EMPTY:
        RETURN ERROR 400 "Missing required fields"

    // Execute persistence
    TRY:
        SET orderId = createSalesOrder(request.body)
        SET savedOrder = FETCH_ORDER_DETAILS(orderId)
        RETURN 201, savedOrder
    CATCH Exception:
        ROLLBACK TRANSACTION
        RETURN 500 "Failed to create Sales Order"