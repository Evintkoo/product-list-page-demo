FUNCTION handleGetStockOpname(request):
    // 1. Authentication & Authorization Check
    IF NOT user.isAuthenticated():
        RETURN 401 Unauthorized
    
    IF NOT user.hasPermission("view_stock_opname"):
        RETURN 403 Forbidden

    // 2. Extract and Validate Query Parameters
    SET warehouse_id = request.query.warehouse_id
    SET start_date = request.query.start_date
    SET end_date = request.query.end_date
    SET page = request.query.page OR 1
    SET limit = request.query.limit OR 20

    // 3. Delegate to Service Layer
    TRY:
        SET results = StockOpnameService.list(
            warehouse_id: warehouse_id,
            date_range: { start: start_date, end: end_date },
            pagination: { page: page, limit: limit }
        )
        RETURN 200 OK, results
    CATCH ValidationError:
        RETURN 400 Bad Request
    CATCH Exception:
        RETURN 500 Internal Server Error