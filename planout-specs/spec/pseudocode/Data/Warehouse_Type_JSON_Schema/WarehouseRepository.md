/**
 * Fetches a paginated list of warehouses based on filter criteria.
 * Uses keyset pagination (after_id) or offset pagination.
 */
function getWarehouses(filters: {
  modified_after?: string,
  active?: boolean,
  after_id?: number,
  page_limit?: number,
  offset?: number
}) {
  const limit = Math.min(filters.page_limit || 100, 300);
  
  // Query execution logic:
  // SELECT id, name, warehouse_code, updated_at, active
  // FROM warehouses
  // WHERE (filters.modified_after IS NULL OR updated_at >= filters.modified_after)
  //   AND (filters.active IS NULL OR active = filters.active)
  //   AND (filters.after_id IS NULL OR id > filters.after_id)
  // ORDER BY updated_at DESC
  // LIMIT limit OFFSET filters.offset
  
  return database.execute(query, [
    filters.modified_after,
    filters.active,
    filters.after_id,
    limit,
    filters.offset
  ]);
}