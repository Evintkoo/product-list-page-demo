/**
 * Data access layer for Customer entities.
 * Handles dynamic filtering, sorting, and pagination logic.
 */
class CustomerRepository {
  
  /**
   * Fetches a paginated list of customers based on dynamic criteria.
   * @param {Object} query - The parsed query parameters from the API request.
   * @returns {Promise<{data: Customer[], total: number}>}
   */
  async findMany(query) {
    const { type, filters, page, per_page, sort, order } = query;

    // 1. Initialize base query builder
    let queryBuilder = Database.table('Customer').where('type', '=', type);

    // 2. Apply dynamic filters
    // Iterate through key-value pairs in the filters object
    for (const [field, value] of Object.entries(filters)) {
      if (this.isValidField(field)) {
        queryBuilder = queryBuilder.where(field, 'LIKE', `%${value}%`);
      }
    }

    // 3. Get total count for pagination metadata
    const total = await queryBuilder.count();

    // 4. Apply sorting
    if (sort) {
      queryBuilder = queryBuilder.orderBy(sort, order || 'asc');
    }

    // 5. Apply pagination
    const offset = (page - 1) * per_page;
    const data = await queryBuilder
      .limit(per_page)
      .offset(offset)
      .select('*');

    return { data, total };
  }

  /**
   * Whitelist check to prevent SQL injection on dynamic fields
   */
  isValidField(field) {
    const allowedFields = ['name', 'status', 'phone', 'email'];
    return allowedFields.includes(field);
  }
}