/**
 * Service layer to bridge the repository and the API controller.
 * Ensures data consistency and applies business logic before returning the response.
 */

FUNCTION fetchReservations(queryParams):
  // Validate and sanitize query parameters
  sanitizedFilters = {
    startDate: queryParams.startDate,
    endDate: queryParams.endDate,
    sku: queryParams.sku,
    productName: queryParams.productName,
    storeId: queryParams.storeId
  }
  
  // Fetch data from repository
  records = StockReservationRepository.getStockReservations(sanitizedFilters)
  
  // Map to StockReservationResponse schema
  RETURN records.map(record => ({
    id: record.id,
    reserve_date: record.reserve_date.toISOString().split('T')[0],
    refcode: record.refcode,
    product_sku: record.product_sku,
    product_name: record.product_name,
    quantity: record.quantity,
    store_name: record.store_name
  }))