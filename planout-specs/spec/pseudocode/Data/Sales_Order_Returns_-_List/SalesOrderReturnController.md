/**
 * API Endpoint: GET /api/sales_order_returns
 * Maps the repository data to the frontend-required JSON structure.
 */
FUNCTION handleGetSalesOrderReturns(request):
    page = request.query.page OR 1
    pageSize = request.query.pageSize OR 20
    
    data = getSalesOrderReturnsList(page, pageSize, request.query.filters)
    
    RETURN JSON {
        "items": data,
        "meta": {
            "currentPage": page,
            "pageSize": pageSize
        }
    }