/**
 * Data access layer for ServiceProduct entities.
 * Handles filtering logic for inactive records and pagination.
 */
class ServiceProductRepository {
  
  /**
   * Fetches a paginated list of ServiceProducts where active is false.
   * @param page - The page number for pagination
   * @param limit - The number of records per page
   * @param filters - Optional filters for type_id or tag_id
   */
  async getInactiveServiceProducts(page: number, limit: number, filters?: { type_id?: string, tag_id?: string }) {
    const offset = (page - 1) * limit;

    // Build query base
    let query = db.table('ServiceProduct').where('active', false);

    // Apply optional filters if provided
    if (filters?.type_id) {
      const typeExists = await db.table('ServiceType').where('id', filters.type_id).exists();
      if (!typeExists) throw new Error('NOT_FOUND_TYPE');
      query = query.where('type_id', filters.type_id);
    }

    if (filters?.tag_id) {
      const tagExists = await db.table('ServiceTag').where('id', filters.tag_id).exists();
      if (!tagExists) throw new Error('NOT_FOUND_TAG');
      query = query.where('tag_id', filters.tag_id);
    }

    // Execute paginated query
    const data = await query
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', 'DESC');

    const total = await db.table('ServiceProduct').where('active', false).count();

    return {
      data,
      meta: {
        total,
        page,
        limit
      }
    };
  }
}