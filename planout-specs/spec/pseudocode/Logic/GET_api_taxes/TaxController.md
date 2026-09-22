FUNCTION handleGetTaxes(request):
    // 1. Extract and validate query parameters
    SET view = request.query.view OR "list"
    SET page = request.query.page OR 1
    SET page_limit = MIN(request.query.page_limit OR 100, 200)
    
    // 2. Handle specific ID lookup
    IF request.query.tax_id IS PRESENT:
        SET tax = DATABASE.find(TAX, id = request.query.tax_id)
        IF tax IS NULL:
            RETURN 404, { "error": "Tax not found" }
        RETURN 200, tax

    // 3. Date Range Normalization
    SET from_date = request.query.from_date
    SET to_date = request.query.to_date
    
    IF from_date IS BLANK AND to_date IS PRESENT:
        from_date = to_date - 31 days
    ELSE IF from_date IS PRESENT AND to_date IS BLANK:
        to_date = from_date + 31 days
    ELSE IF from_date IS BLANK AND to_date IS BLANK AND request.query.date_option IS PRESENT:
        to_date = TODAY
        from_date = to_date - 31 days
        
    IF to_date < from_date OR (to_date - from_date) > 31 days:
        to_date = from_date + 31 days

    // 4. Build Query Filters
    SET filters = {}
    IF request.query.is_active IS NOT NULL:
        filters.is_active = request.query.is_active
    
    // Apply date filtering based on date_option
    SET date_field = (request.query.date_option == "2" OR request.query.date_option == "updated_at") ? "updated_at" : "created_at"
    filters[date_field] = { "gte": from_date, "lte": to_date }

    // 5. Execute Query
    IF view == "options":
        // Return minimal set for dropdowns
        RETURN 200, DATABASE.findMany(TAX, filters, fields=["id", "name"], active=true)
    ELSE:
        // Return full list with pagination
        SET results = DATABASE.findMany(TAX, filters, limit=page_limit, offset=(page-1)*page_limit)
        RETURN 200, results