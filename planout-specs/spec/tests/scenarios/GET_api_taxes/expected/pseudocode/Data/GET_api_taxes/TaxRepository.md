/**
 * Handles data access for Tax entities.
 * Supports filtering, pagination, and projection for list vs. option views.
 */
class TaxRepository {
  
  /**
   * Fetches taxes based on dynamic query criteria.
   * @param filters Object containing is_active, tax_id, date_option, from_date, to_date
   * @param pagination Object containing page, page_limit
   * @param viewMode 'list' | 'options'
   */
  async findTaxes(filters, pagination, viewMode) {
    let query = DB.table('TAX');

    // Apply exact ID filter
    if (filters.tax_id) {
      return await query.where('id', filters.tax_id).first();
    }

    // Apply active status filter
    if (filters.is_active !== undefined) {
      query = query.where('is_active', filters.is_active);
    }

    // Apply date range filters
    if (filters.from_date && filters.to_date) {
      const column = filters.date_option === '2' ? 'updated_at' : 'created_at';
      query = query.whereBetween(column, [filters.from_date, filters.to_date]);
    }

    // Handle view-specific projection
    if (viewMode === 'options') {
      return await query.select('id', 'name').orderBy('name', 'ASC');
    }

    // Default list view with pagination
    const offset = (pagination.page - 1) * pagination.page_limit;
    const data = await query
      .limit(pagination.page_limit)
      .offset(offset)
      .orderBy('created_at', 'DESC');

    const total = await DB.table('TAX').count();

    return {
      data,
      meta: {
        total,
        page: pagination.page,
        page_limit: pagination.page_limit
      }
    };
  }
}