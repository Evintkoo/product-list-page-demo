/**
 * Repository layer for handling Stock Reservation data access.
 * Maps database rows to the StockReservationResponse shape.
 */

FUNCTION getStockReservations(filters):
  // filters object contains: startDate, endDate, sku, productName, storeId
  
  QUERY = "SELECT id, reserve_date, refcode, product_sku, product_name, quantity, store_name 
           FROM stock_reservation 
           WHERE ($1 IS NULL OR reserve_date >= $1)
             AND ($2 IS NULL OR reserve_date <= $2)
             AND ($3 IS NULL OR product_sku ILIKE $3)
             AND ($4 IS NULL OR product_name ILIKE $4)
             AND ($5 IS NULL OR store_id = $5)"
  
  PARAMS = [
    filters.startDate, 
    filters.endDate, 
    filters.sku ? `%${filters.sku}%` : NULL, 
    filters.productName ? `%${filters.productName}%` : NULL, 
    filters.storeId
  ]
  
  RETURN database.execute(QUERY, PARAMS)