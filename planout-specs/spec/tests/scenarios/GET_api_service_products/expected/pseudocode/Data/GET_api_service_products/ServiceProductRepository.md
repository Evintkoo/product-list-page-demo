/**
 * Data access layer for ServiceProduct entities.
 * Handles filtering, pagination, and sorting logic for the API.
 */

function findServiceProducts(filters: {
  page: number,
  page_limit: number,
  modified_after?: string,
  active?: boolean,
  sku?: string,
  id?: string,
  sort_by: string,
  sort_direction: 'ASC' | 'DESC'
}) {
  // 1. Initialize base query for ServiceProduct table
  let query = db.select().from('ServiceProduct');

  // 2. Apply filters
  if (filters.id) {
    query = query.where('id', '=', filters.id);
  }
  
  if (filters.sku) {
    query = query.where('sku', '=', filters.sku);
  }

  // Default to active = true if not specified
  const isActive = filters.active !== undefined ? filters.active : true;
  query = query.where('active', '=', isActive);

  if (filters.modified_after) {
    query = query.where('updated_at', '>', filters.modified_after);
  }

  // 3. Apply sorting
  // Allowed sort fields: id, sku, name, created_at, updated_at
  query = query.orderBy(filters.sort_by, filters.sort_direction);

  // 4. Apply pagination
  const offset = (filters.page - 1) * filters.page_limit;
  query = query.limit(filters.page_limit).offset(offset);

  // 5. Execute and return results
  return query.execute();
}

/**
 * Helper to verify existence for 404 handling
 */
function exists(id: string): boolean {
  return db.select('id').from('ServiceProduct').where('id', '=', id).exists();
}