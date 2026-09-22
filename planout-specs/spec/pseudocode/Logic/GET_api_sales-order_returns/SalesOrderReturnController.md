FUNCTION GET /api/sales-order-returns(request):
    // 1. Authentication Check
    IF NOT user.isAuthenticated():
        RETURN 401 Unauthorized

    // 2. Extract and Validate Query Parameters
    SET limit = request.query.limit OR 20
    SET offset = request.query.offset OR 0
    SET sort = request.query.sort OR "created_at"
    SET direction = request.query.direction OR "desc"
    
    // Validate sort field (must be one of: ref_code, customer_name, warehouse_id, workflow_state, created_at)
    IF NOT isValidSort(sort):
        RETURN 400 Bad Request

    // 3. Build Query Filters
    SET filters = {
        company_id: user.company_id,
        ref_code: request.query.ref_code,
        customer_name: request.query.customer_name,
        warehouse_id: request.query.warehouse_id,
        workflow_state: request.query.workflow_state,
        created_at_range: {
            from: request.query.created_at_from,
            to: request.query.created_at_to
        }
    }

    // 4. Execute Data Retrieval
    TRY:
        SET results = SalesOrderReturnService.list(filters, limit, offset, sort, direction)
        RETURN 200 OK, results
    CATCH Exception:
        RETURN 500 Internal Server Error