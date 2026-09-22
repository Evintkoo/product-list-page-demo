FUNCTION handleGetProducts(request):
    // 1. Validate Authentication
    IF request.headers.authorization IS MISSING OR invalid:
        RETURN 401, { "error": "Unauthorized" }

    // 2. Parse and Validate Query Parameters
    SET page = PARSE_INT(request.query.page) DEFAULT 1
    SET limit = PARSE_INT(request.query.limit) DEFAULT 20

    IF page < 1 OR limit < 1 OR limit > 100:
        RETURN 400, { "error": "Invalid pagination parameters" }

    // 3. Fetch Data from Service
    TRY:
        SET result = ProductService.findAll(page, limit)
        RETURN 200, result
    CATCH error:
        RETURN 500, { "error": "Internal Server Error" }