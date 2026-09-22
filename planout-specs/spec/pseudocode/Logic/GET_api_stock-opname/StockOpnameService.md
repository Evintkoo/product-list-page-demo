FUNCTION list(filters, pagination):
    // Build query for StockOpname entity
    SET query = Database.select(StockOpname)

    // Apply filters if provided
    IF filters.warehouse_id IS NOT NULL:
        query.where(StockOpname.warehouse_id == filters.warehouse_id)
    
    IF filters.date_range.start IS NOT NULL:
        query.where(StockOpname.scheduled_date >= filters.date_range.start)
        
    IF filters.date_range.end IS NOT NULL:
        query.where(StockOpname.scheduled_date <= filters.date_range.end)

    // Apply pagination
    query.offset((pagination.page - 1) * pagination.limit)
    query.limit(pagination.limit)
    
    // Execute and return
    RETURN query.execute()