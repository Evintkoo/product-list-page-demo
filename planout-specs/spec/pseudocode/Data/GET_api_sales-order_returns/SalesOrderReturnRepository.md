/**
 * Data access layer for Sales Order Returns.
 * Handles filtering, pagination, and sorting logic scoped to the company.
 */
class SalesOrderReturnRepository {
  
  /**
   * Fetches a paginated list of SalesOrderReturn records.
   * @param companyId - The ID of the authenticated user's company.
   * @param params - Query parameters including filters, pagination, and sorting.
   */
  async list(companyId: UUID, params: {
    limit: number,
    offset: number,
    sort: string,
    direction: 'asc' | 'desc',
    ref_code?: string,
    customer_name?: string,
    warehouse_id?: UUID,
    workflow_state?: string,
    created_at_from?: datetime,
    created_at_to?: datetime
  }) {
    let query = db.table('SalesOrderReturn')
      .where('company_id', '=', companyId);

    // Apply Filters
    if (params.ref_code) {
      query = query.where('ref_code', 'LIKE', `${params.ref_code}%`);
    }
    if (params.customer_name) {
      query = query.where('customer_name', 'ILIKE', `%${params.customer_name}%`);
    }
    if (params.warehouse_id) {
      query = query.where('warehouse_id', '=', params.warehouse_id);
    }
    if (params.workflow_state) {
      query = query.where('workflow_state', '=', params.workflow_state);
    }
    if (params.created_at_from) {
      query = query.where('created_at', '>=', params.created_at_from);
    }
    if (params.created_at_to) {
      query = query.where('created_at', '<=', params.created_at_to);
    }

    // Apply Sorting
    // Note: 'sort' accepts any field except 'sales_order_id'
    query = query.orderBy(params.sort, params.direction);

    // Apply Pagination
    return await query
      .limit(params.limit)
      .offset(params.offset)
      .execute();
  }
}