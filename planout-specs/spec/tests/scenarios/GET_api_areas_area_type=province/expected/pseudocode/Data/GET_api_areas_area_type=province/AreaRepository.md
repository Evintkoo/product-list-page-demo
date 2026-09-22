/**
 * Data access layer for Area entities.
 * Handles filtering, pagination, and sorting for the province list.
 */
class AreaRepository {
  
  /**
   * Fetches a paginated list of areas filtered by type and optional name.
   * 
   * @param filter - Object containing 'name' (optional)
   * @param pagination - Object containing 'page' and 'pageSize'
   * @returns Promise containing the list of Area records and total count
   */
  async findProvinces(filter: { name?: string }, pagination: { page: number, pageSize: number }) {
    const query = DB.table('Area')
      .where('area_type', '=', 'province');

    // Apply optional name filter (case-insensitive partial match)
    if (filter.name) {
      query.where('name', 'ILIKE', `%${filter.name}%`);
    }

    // Apply default sorting
    query.orderBy('name', 'ASC');

    // Apply pagination
    const offset = (pagination.page - 1) * pagination.pageSize;
    
    const [data, total] = await Promise.all([
      query.limit(pagination.pageSize).offset(offset).execute(),
      query.count()
    ]);

    return {
      data,
      meta: {
        total,
        page: pagination.page,
        pageSize: pagination.pageSize
      }
    };
  }
}

export default new AreaRepository();