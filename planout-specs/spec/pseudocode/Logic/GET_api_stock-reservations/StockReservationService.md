FUNCTION find(filters):
    // Build query based on StockReservation entity
    query = Database.select(StockReservation)

    IF filters.product_sku IS NOT NULL:
        query.where("product_sku", "=", filters.product_sku)
    
    IF filters.product_name IS NOT NULL:
        query.where("product_name", "LIKE", "%" + filters.product_name + "%")
        
    IF filters.store_id IS NOT NULL:
        query.where("store_id", "=", filters.store_id)
        
    IF filters.from_date IS NOT NULL:
        query.where("reserved_at", ">=", filters.from_date)
        
    IF filters.to_date IS NOT NULL:
        query.where("reserved_at", "<=", filters.to_date)

    RETURN query.execute()