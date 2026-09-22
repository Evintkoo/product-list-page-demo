/**
 * Handles data retrieval for Stock Orders.
 * Scoped to the authenticated user's company_id.
 */
function getStockOrders(filters, pagination, sorting, companyId) {
  // 1. Build base query
  let query = db.table("StockOrder")
    .where("company_id", "=", companyId);

  // 2. Apply source_type filter (required for tab switching)
  if (filters.source_type) {
    query = query.where("source_type", "=", filters.source_type);
  }

  // 3. Apply additional search/filter criteria
  if (filters.search) {
    query = query.where("order_number", "like", `%${filters.search}%`);
  }

  // 4. Apply sorting
  // Default: created_at DESC
  // Note: order_amount and receive_amount are explicitly excluded from sorting
  const sortField = sorting.field || "created_at";
  const sortDirection = sorting.direction || "DESC";
  
  if (["order_amount", "receive_amount"].includes(sortField)) {
    throw new Error("Invalid sort field");
  }
  
  query = query.orderBy(sortField, sortDirection);

  // 5. Apply pagination
  const limit = pagination.limit || 20;
  const offset = (pagination.page - 1) * limit;
  
  const totalCount = query.count();
  const data = query.limit(limit).offset(offset).fetchAll();

  return {
    data: data,
    meta: {
      total: totalCount,
      page: pagination.page,
      limit: limit
    }
  };
}