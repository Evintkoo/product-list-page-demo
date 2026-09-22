FUNCTION GET /api/store-stock-histories(request):
    // 1. Authentication Check
    IF NOT request.isAuthenticated():
        RETURN 401 Unauthorized

    // 2. Extract and Sanitize Query Parameters
    // Mapping query filters to StoreStockHistory fields
    filters = {
        store_id: request.query.q.store_id_cont,
        product_id: request.query.q.product_id_cont,
        transaction_type: request.query.q.transaction_type_cont,
        created_at_start: request.query.q.created_at_dategteq,
        created_at_end: request.query.q.created_at_datelteq,
        created_by: request.query.q.created_by_cont
    }
    
    pagination = {
        page: request.query.page OR 1,
        pageSize: request.query.pageSize OR 20
    }

    // 3. Fetch Data from Service
    TRY:
        result = StoreStockHistoryService.findMany(filters, pagination)
        
        RETURN 200 OK, {
            data: result.items,
            page: result.page,
            pageSize: result.pageSize,
            total: result.totalCount
        }
    CATCH error:
        LOG error
        RETURN 500 Internal Server Error, { error: "Failed to retrieve stock history" }