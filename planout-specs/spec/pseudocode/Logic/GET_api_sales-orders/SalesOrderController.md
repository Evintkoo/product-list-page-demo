FUNCTION handleGetSalesOrders(request):
    // 1. Authentication Check
    IF NOT user.isAuthenticated():
        RETURN 401 Unauthorized

    // 2. Extract and Validate Query Parameters
    // Apply defaults if not provided
    params = {
        limit: request.query.limit OR 20,
        offset: request.query.offset OR 0,
        sort: request.query.sort OR "created_at",
        direction: request.query.direction OR "desc",
        filters: {
            document_number: request.query.document_number,
            purchase_order_number: request.query.purchase_order_number,
            from_date: request.query.from_date,
            to_date: request.query.to_date,
            warehouse_id: request.query.warehouse_id,
            customer: request.query.customer,
            salesperson: request.query.salesperson,
            status: request.query.status
        }
    }

    // Validate parameters (e.g., date formats, UUID formats)
    IF NOT validateQueryParams(params):
        RETURN 400 Bad Request

    // 3. Fetch Data
    TRY:
        // Scope to authenticated user's company
        companyId = user.company_id
        results = SalesOrderService.fetchList(companyId, params)
        
        RETURN 200 OK, results
    CATCH error:
        RETURN 500 Internal Server Error