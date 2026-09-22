/**
 * Data access layer for ProductBrand entities.
 * Handles filtering, pagination, and sorting logic.
 */
function getProductBrands(query: { q?: string, page: number, rows: number }) {
  // 1. Initialize base query for ProductBrand table
  let queryBuilder = db.table("ProductBrand");

  // 2. Apply optional case-insensitive filter
  if (query.q) {
    queryBuilder = queryBuilder.where("brandName", "ILIKE", `%${query.q}%`);
  }

  // 3. Apply sorting
  queryBuilder = queryBuilder.orderBy("brandName", "ASC");

  // 4. Apply pagination
  // Offset = (page - 1) * rows
  const offset = (query.page - 1) * query.rows;
  queryBuilder = queryBuilder.limit(query.rows).offset(offset);

  // 5. Execute query
  return queryBuilder.execute();
}

/**
 * Helper to count total records for pagination metadata
 */
function countProductBrands(q?: string) {
  let queryBuilder = db.table("ProductBrand");
  if (q) {
    queryBuilder = queryBuilder.where("brandName", "ILIKE", `%${q}%`);
  }
  return queryBuilder.count();
}