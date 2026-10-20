FUNCTION handleGetProducts(request):
    // 1. Validate Authentication
    IF NOT request.isAuthenticated():
        RETURN 401 Unauthorized, { "error": "Authentication required" }

    // 2. Parse and Validate Pagination Parameters
    // Default to page 1, limit 10 if not provided
    SET page = PARSE_INT(request.query.page) OR 1
    SET limit = PARSE_INT(request.query.limit) OR 10

    IF page < 1 OR limit < 1:
        RETURN 400 Bad Request, { "error": "Invalid pagination parameters" }

    TRY:
        // 3. Fetch Data from Database
        SET offset = (page - 1) * limit
        
        // Fetch total count for metadata
        SET totalCount = DATABASE.Product.COUNT()
        
        // Fetch paginated records
        SET products = DATABASE.Product.FIND_ALL(
            OFFSET: offset,
            LIMIT: limit,
            ORDER_BY: "created_at DESC"
        )

        // 4. Construct Response
        RETURN 200 OK, {
            "data": products,
            "metadata": {
                "page": page,
                "limit": limit,
                "total_count": totalCount
            }
        }

    CATCH Exception:
        // 5. Handle Unexpected Failures
        RETURN 500 Internal Server Error, { "error": "An unexpected error occurred" }