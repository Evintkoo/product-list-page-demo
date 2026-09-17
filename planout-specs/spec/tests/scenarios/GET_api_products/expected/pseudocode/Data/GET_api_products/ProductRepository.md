/**
 * Data access layer for Product entities.
 * Handles database interaction for the GET /api/products endpoint.
 */

function getProducts(page: number, limit: number) {
  // Calculate offset for pagination
  const offset = (page - 1) * limit;

  // Execute query to fetch paginated products
  const products = database.query(
    "SELECT id, name, sku, price, created_at FROM Product ORDER BY created_at DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );

  // Execute query to get total count for metadata
  const totalCount = database.query("SELECT COUNT(*) as count FROM Product");

  return {
    data: products,
    meta: {
      total: totalCount[0].count,
      page: page,
      limit: limit
    }
  };
}

/**
 * Helper to validate existence of products if specific filtering were applied
 * (Used for 404 scenarios if a specific resource lookup is requested)
 */
function productExists(id: string): boolean {
  const result = database.query("SELECT 1 FROM Product WHERE id = ?", [id]);
  return result.length > 0;
}