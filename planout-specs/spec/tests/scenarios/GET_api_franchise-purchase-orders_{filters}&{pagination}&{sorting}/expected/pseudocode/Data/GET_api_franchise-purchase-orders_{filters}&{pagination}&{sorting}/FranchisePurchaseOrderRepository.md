/**
 * Fetches a paginated list of Franchise Purchase Orders based on filters and sorting.
 * Note: order_amount and receive_amount are calculated via aggregation of lines.
 */
function getFranchisePurchaseOrders(
  companyId: UUID,
  filters: {
    order_type?: string,
    status?: string,
    created_at_from?: datetime,
    created_at_to?: datetime
  },
  pagination: {
    limit: integer,
    offset: integer
  },
  sorting: {
    sort_by: string, // Allowed: 'created_at', 'order_number'
    sort_order: 'asc' | 'desc'
  }
) {
  // 1. Build base query scoped to company_id
  let query = DB.table('FranchisePurchaseOrder')
    .where('company_id', companyId);

  // 2. Apply Filters
  if (filters.order_type) query.where('order_type', filters.order_type);
  if (filters.status) query.where('status', filters.status);
  if (filters.created_at_from) query.where('created_at', '>=', filters.created_at_from);
  if (filters.created_at_to) query.where('created_at', '<=', filters.created_at_to);

  // 3. Get total count before pagination
  const totalCount = query.count();

  // 4. Apply Sorting (Default to created_at DESC)
  const sortBy = sorting.sort_by || 'created_at';
  const sortOrder = sorting.sort_order || 'desc';
  query.orderBy(sortBy, sortOrder);

  // 5. Apply Pagination
  query.limit(pagination.limit).offset(pagination.offset);

  // 6. Execute and join with calculated totals
  // We use a subquery or join to calculate order_amount and receive_amount
  const orders = query.select(
    'FranchisePurchaseOrder.*',
    DB.raw('(SELECT SUM(quantity * unit_price) FROM FranchisePurchaseOrderLine WHERE purchase_order_id = FranchisePurchaseOrder.id) as order_amount'),
    DB.raw('(SELECT SUM(received_quantity * unit_price) FROM FranchisePurchaseOrderLine WHERE purchase_order_id = FranchisePurchaseOrder.id) as receive_amount')
  ).execute();

  return {
    data: orders,
    total: totalCount
  };
}