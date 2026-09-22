FUNCTION handlePostCustomer(httpRequest):
    // 1. Validate Authentication
    IF NOT httpRequest.user:
        RETURN 401 Unauthorized

    // 2. Validate Request Body
    IF NOT isValid(httpRequest.body):
        RETURN 400 Bad Request

    TRY:
        // 3. Invoke Service
        SET newCustomer = createCustomer(httpRequest.body, httpRequest.user)
        
        // 4. Return Success
        RETURN 201 Created, newCustomer
    CATCH ValidationException:
        RETURN 422 Unprocessable Entity
    CATCH Exception:
        ROLLBACK TRANSACTION
        RETURN 500 Internal Server Error