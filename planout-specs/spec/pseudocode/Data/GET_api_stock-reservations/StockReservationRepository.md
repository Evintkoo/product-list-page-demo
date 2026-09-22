/**
 * Data access layer for Stock Reservations.
 * Handles filtering logic against the database to support the GET /api/stock-reservations endpoint.
 */

FUNCTION findReservations(filters):
    // Initialize base query
    query = SELECT * FROM StockReservation

    // Apply dynamic filters based on provided query parameters
    IF filters.from_date IS NOT NULL:
        query.WHERE(reserved_at >= filters.from_date)
    
    IF filters.to_date IS NOT NULL:
        query.WHERE(reserved_at <= filters.to_date)
        
    IF filters.product_sku IS NOT NULL:
        query.WHERE(product_sku == filters.product_sku)
        
    IF filters.product_name IS NOT NULL:
        query.WHERE(product_name LIKE %filters.product_name%)
        
    IF filters.store_id IS NOT NULL:
        query.WHERE(store_id == filters.store_id)

    // Execute query and return results
    RETURN database.execute(query)