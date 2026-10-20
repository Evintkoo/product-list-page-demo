/**
 * Data access layer for Product entities.
 * Handles database queries for the Product List Page, including filtering and pagination.
 */

function getProducts(filters: { search?: string, brand?: string }, page: number, pageSize: number) {
  // Construct query to fetch products from the 'Product' table
  // Apply filters:
  // - If 'search' is provided, filter by 'productName' or 'sku' (ILIKE)
  // - If 'brand' is provided, filter by 'brandName' (EQUALS)
  
  // Apply pagination:
  // - OFFSET = (page - 1) * pageSize
  // - LIMIT = pageSize
  
  // Return list of products and total count for pagination metadata
  return db.query(`
    SELECT id, sku, productName, brandName, productCode, tax, price 
    FROM Product
    WHERE (:search IS NULL OR productName ILIKE :search OR sku ILIKE :search)
      AND (:brand IS NULL OR brandName = :brand)
    ORDER BY productName ASC
    LIMIT :pageSize OFFSET :offset
  `, { search, brand, pageSize, offset });
}