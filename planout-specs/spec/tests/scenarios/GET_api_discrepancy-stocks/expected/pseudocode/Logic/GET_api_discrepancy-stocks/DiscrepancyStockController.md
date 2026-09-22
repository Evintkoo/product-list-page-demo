FUNCTION handleGetDiscrepancyStocks(request, response):
    // 1. Authentication Check
    IF NOT user.isAuthenticated():
        RETURN response.status(401).json({ error: "Unauthorized" })

    // 2. Extract and Validate Query Parameters
    // Scoped to current user's company
    SET companyId = user.company_id
    SET entityType = "store" <!-- MISSING_FIELD: DiscrepancyStock.entity_type_constant -->
    
    SET filters = {
        sku: request.query.sku,
        status: request.query.status,
        report_date_range: {
            from: request.query.report_date_from,
            to: request.query.report_date_to
        }
    }
    
    SET pagination = {
        page: request.query.page OR 1,
        limit: request.query.limit OR 20
    }

    // 3. Execute Query via Service
    TRY:
        SET results = DiscrepancyStockService.fetchList(
            companyId, 
            entityType, 
            filters, 
            pagination
        )
        RETURN response.status(200).json(results)
    CATCH error:
        RETURN response.status(500).json({ error: "Internal Server Error" })