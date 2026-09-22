/**
 * Data access layer for Stock Opname records.
 * Handles database queries for inventory reconciliation lists.
 */

FUNCTION findStockOpnameRecords(filters, pagination):
    // Construct base query for StockOpname entity
    query = SELECT * FROM StockOpname

    // Apply optional filters
    IF filters.warehouse_id IS NOT NULL:
        query = query.WHERE(warehouse_id == filters.warehouse_id)
    
    IF filters.start_date IS NOT NULL AND filters.end_date IS NOT NULL:
        query = query.WHERE(scheduled_date BETWEEN filters.start_date AND filters.end_date)

    // Apply pagination
    query = query.LIMIT(pagination.limit)
    query = query.OFFSET(pagination.offset)
    
    // Order by most recent
    query = query.ORDER_BY(scheduled_date, DESC)

    RETURN execute(query)

FUNCTION countStockOpnameRecords(filters):
    // Used for calculating total pages for the API response
    query = SELECT COUNT(*) FROM StockOpname
    
    IF filters.warehouse_id IS NOT NULL:
        query = query.WHERE(warehouse_id == filters.warehouse_id)
        
    RETURN execute(query)