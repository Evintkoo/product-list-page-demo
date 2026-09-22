POST /api/stock-orders:
    TRY:
        // Extract user context from session/token
        SET userContext = AUTH_SERVICE.getCurrentUser()
        
        // Validate request body presence
        IF request.body IS EMPTY THEN
            RETURN 400, "Missing request body"
        END IF

        // Execute service logic
        SET result = StockOrderService.createStockOrder(request.body, userContext)
        
        RETURN 201, result
    CATCH ConflictError:
        RETURN 409, "Conflict: " + error.message
    CATCH ValidationError:
        RETURN 400, "Invalid input: " + error.message
    CATCH Exception:
        ROLLBACK TRANSACTION
        RETURN 500, "Internal Server Error"