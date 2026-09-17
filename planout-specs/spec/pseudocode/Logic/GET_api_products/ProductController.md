/**
 * Handles the GET /api/products request.
 * Orchestrates authentication, validation, and data retrieval.
 */
FUNCTION handleGetProducts(request):
    // 1. Validate Authentication
    IF NOT isAuthenticated(request):
        RETURN 401 Unauthorized

    // 2. Extract and Validate Query Parameters
    SET page = PARSE_INT(request.query.page) OR 1
    SET limit = PARSE_INT(request.query.limit) OR 20
    
    IF page < 1 OR limit < 1:
        RETURN 400 Bad Request ("Invalid pagination parameters")

    // 3. Fetch Data from Service
    TRY:
        SET result = ProductService.getAllProducts(page, limit)
        RETURN 200 OK (result)
    CATCH Exception:
        RETURN 500 Internal Server Error