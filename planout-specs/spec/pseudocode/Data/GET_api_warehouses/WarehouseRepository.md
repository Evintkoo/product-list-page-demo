/**
 * Executes the database query for the Warehouse list with support for 
 * offset-based and keyset-based pagination, filtering, and sorting.
 */
function getWarehouses(params) {
  // 1. Initialize Query Builder for Warehouse entity
  let query = DB.table('Warehouse');

  // 2. Apply Filters
  if (params.active !== undefined) {
    query.where('active', '=', params.active === 'true');
  }

  if (params.modified_after) {
    query.where('updated_at', '>', params.modified_after);
  }

  // 3. Apply Keyset Pagination (after_id) or Offset Pagination (page)
  if (params.after_id) {
    // Keyset pagination for large datasets
    query.where('id', '>', params.after_id);
    query.orderBy('id', 'ASC');
  } else {
    // Standard offset pagination
    const limit = Math.min(params.page_limit || 100, 300);
    const offset = (params.page - 1) * limit;
    query.limit(limit).offset(offset);
  }

  // 4. Apply Sorting
  const sortField = params.sort_by || 'updated_at';
  const sortDirection = params.sort_direction || 'ASC';
  query.orderBy(sortField, sortDirection);

  // 5. Execute and return results
  return query.fetchAll();
}