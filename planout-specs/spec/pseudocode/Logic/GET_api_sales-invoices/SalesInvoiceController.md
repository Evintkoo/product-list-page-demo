FUNCTION GET /api/sales-invoices(request):
    // 1. Authentication & Authorization
    user_context = AuthenticateRequest(request)
    IF user_context IS NULL:
        RETURN 401 Unauthorized

    // 2. Extract and Validate Query Parameters
    params = request.query
    
    // 3. Invoke Service Layer
    results, total_count = SalesInvoiceService.ListInvoices(
        company_id = user_context.company_id,
        filters = {
            document_number: params.document_number,
            sales_order_id: params.sales_order_id,
            customer_name: params.customer,
            workflow_state: params.status
        },
        pagination = {
            limit: params.limit OR 20,
            offset: params.offset OR 0
        },
        sorting = {
            sort_field: params.sort OR "created_at",
            direction: params.direction OR "DESC"
        }
    )

    RETURN 200 OK, { data: results, total: total_count }