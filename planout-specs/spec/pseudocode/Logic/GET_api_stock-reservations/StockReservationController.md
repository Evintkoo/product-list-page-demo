FUNCTION handleGetStockReservations(request):
    // 1. Authentication & Authorization Check
    IF NOT request.isAuthenticated():
        RETURN 401 Unauthorized
    
    IF NOT request.user.hasPermission("view_stock_reservations"):
        RETURN 403 Forbidden

    // 2. Extract and Validate Query Parameters
    TRY:
        filters = {
            product_sku: request.query.product_sku,
            product_name: request.query.product_name,
            store_id: request.query.store_id,
            from_date: request.query.from_date,
            to_date: request.query.to_date
        }
    CATCH:
        RETURN 400 Bad Request ("Malformed query parameters")

    // 3. Fetch Data via Service
    TRY:
        reservations = StockReservationService.find(filters)
        RETURN 200 OK (reservations)
    CATCH:
        RETURN 500 Internal Server Error