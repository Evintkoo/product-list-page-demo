/**
 * Fetches a paginated list of sales quotations based on filters.
 * Note: company_id is derived from the authenticated user's session context.
 */
function getSalesQuotations(
  companyId: UUID,
  filters: {
    document_number?: string,
    sales_order_id?: UUID,
    customer?: string,
    status?: string
  },
  pagination: { limit: number, offset: number }
) {
  // Base query scoped to company
  let query = DB.table("sales_quotations").where("company_id", companyId);

  // Apply filters
  if (filters.document_number) {
    query = query.where("document_number", "LIKE", `${filters.document_number}%`);
  }

  if (filters.sales_order_id) {
    // Scopes to specific order; implicitly excludes null sales_order_id
    query = query.where("sales_order_id", filters.sales_order_id);
  }

  if (filters.customer) {
    query = query.where("customer_name", "LIKE", `%${filters.customer}%`);
  }

  if (filters.status) {
    query = query.where("workflow_state", filters.status);
  }

  // Get total count for pagination metadata
  const totalCount = query.count();

  // Apply sorting (Hard-coded to created_at DESC per project requirements)
  // Note: sort/direction params are ignored due to existing system constraints
  const data = query
    .orderBy("created_at", "DESC")
    .limit(pagination.limit)
    .offset(pagination.offset)
    .fetchAll();

  return {
    data,
    totalCount
  };
}