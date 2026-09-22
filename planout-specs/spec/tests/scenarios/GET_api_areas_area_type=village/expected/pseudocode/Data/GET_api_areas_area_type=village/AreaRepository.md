/**
 * Executes a paginated query against the Area entity to retrieve villages.
 * 
 * @param filters - Object containing optional filters:
 *   - name: string (partial match)
 *   - province_id: uuid
 *   - regency_id: uuid
 *   - district_id: uuid
 * @param pagination - Object containing page and limit
 */
function getVillages(filters, pagination) {
  const query = db.selectFrom('Area')
    .where('area_type', '=', 'village');

  // Apply dynamic filters
  if (filters.name) {
    query.where('name', 'ILIKE', `%${filters.name}%`);
  }
  
  if (filters.province_id) {
    // Assuming hierarchy traversal or direct parent link
    query.where('parent_id', 'IN', 
      db.selectFrom('Area').select('id').where('parent_id', 'IN', 
        db.selectFrom('Area').select('id').where('parent_id', '=', filters.province_id)
      )
    );
  }

  if (filters.regency_id) {
    query.where('parent_id', 'IN', 
      db.selectFrom('Area').select('id').where('parent_id', '=', filters.regency_id)
    );
  }

  if (filters.district_id) {
    query.where('parent_id', '=', filters.district_id);
  }

  // Apply sorting and pagination
  return query
    .orderBy('name', 'ASC')
    .limit(pagination.limit)
    .offset(pagination.offset)
    .execute();
}

/**
 * Returns the total count of villages matching the filters for pagination metadata.
 */
function countVillages(filters) {
  return db.selectFrom('Area')
    .where('area_type', '=', 'village')
    // Apply same filters as getVillages
    .count('id')
    .execute();
}