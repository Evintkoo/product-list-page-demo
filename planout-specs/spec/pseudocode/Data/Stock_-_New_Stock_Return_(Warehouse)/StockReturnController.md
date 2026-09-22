/**
 * API Controller for POST /api/stock_returns
 * Validates input and invokes the repository layer.
 */

ENDPOINT POST /api/stock_returns:
    // Extract data from request body
    SET requestData = REQUEST.body

    // Validate required fields
    IF NOT requestData.from_store_id OR NOT requestData.products:
        RETURN ERROR 400 "Missing required fields"

    // Persist to database
    TRY:
        SET resultId = CALL createStockReturn(requestData)
        RETURN SUCCESS 201 { "id": resultId, "status": "created" }
    CATCH error:
        RETURN ERROR 500 "Failed to process stock return"