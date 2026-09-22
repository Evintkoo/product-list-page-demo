/**
 * Data access layer for Area entities.
 * Handles filtering, pagination, and sorting for the Regency list.
 */
class AreaRepository {
  
  /**
   * Fetches a paginated list of areas filtered by type, name, and parent.
   * 
   * @param filters {
   *   area_type: string, // Expected: 'regency'
   *   name?: string,      // Partial match for area name
   *   province_id?: uuid, // Maps to parent_id
   *   page: number,
   *   limit: number
   * }
   */
  async findRegencies(filters) {
    const { area_type, name, province_id, page, limit } = filters;
    const offset = (page - 1) * limit;

    // Build base query for areas
    let query = db.table('Area').where('area_type', area_type);

    // Apply optional name filter (case-insensitive partial match)
    if (name) {
      query = query.where('name', 'ILIKE', `%${name}%`);
    }

    // Apply optional province filter
    if (province_id) {
      query = query.where('parent_id', province_id);
    }

    // Execute query with sorting and pagination
    const results = await query
      .orderBy('name', 'ASC')
      .limit(limit)
      .offset(offset)
      .select('id', 'name', 'parent_id');

    // Get total count for pagination metadata
    const totalCount = await db.table('Area')
      .where('area_type', area_type)
      .modify((q) => {
        if (name) q.where('name', 'ILIKE', `%${name}%`);
        if (province_id) q.where('parent_id', province_id);
      })
      .count();

    return {
      data: results,
      meta: {
        total: totalCount,
        page,
        limit
      }
    };
  }
}