/**
 * Data access layer for ProductType entities.
 * Handles filtering, pagination, and sorting logic.
 */
class ProductTypeRepository {
  
  /**
   * Retrieves a paginated list of ProductType records.
   * @param filter - Optional string to match against productTypeName (case-insensitive).
   * @param page - Current page number (default 1).
   * @param limit - Number of records per page (default 20).
   */
  async findMany(filter: string | null, page: number, limit: number) {
    const offset = (page - 1) * limit;

    // Build query base
    let query = db.select().from("ProductType");

    // Apply case-insensitive filter if provided
    if (filter) {
      query = query.where("productTypeName", "ILIKE", `%${filter}%`);
    }

    // Apply sorting
    query = query.orderBy("productTypeName", "ASC");

    // Apply pagination
    query = query.limit(limit).offset(offset);

    const results = await query.execute();

    // Return results and metadata for the response
    return {
      data: results,
      totalCount: await this.count(filter),
      page,
      limit
    };
  }

  /**
   * Helper to count records for pagination metadata.
   */
  async count(filter: string | null): Promise<number> {
    let query = db.select().from("ProductType").count();
    
    if (filter) {
      query = query.where("productTypeName", "ILIKE", `%${filter}%`);
    }
    
    return await query.execute();
  }
}