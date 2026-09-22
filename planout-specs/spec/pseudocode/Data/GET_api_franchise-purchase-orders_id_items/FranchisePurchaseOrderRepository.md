/**
 * Fetches a paginated list of items for a specific franchise purchase order.
 * Scoped by company_id to ensure data isolation.
 */
function getFranchisePurchaseOrderItems(
  franchise_purchase_order_id: uuid,
  company_id: uuid,
  pagination: { page: integer, limit: integer }
) {
  // 1. Verify the parent order exists and belongs to the authenticated company
  const order = db.FranchisePurchaseOrder.findFirst({
    where: {
      id: franchise_purchase_order_id,
      company_id: company_id
    }
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  // 2. Fetch items associated with the order
  // Results are returned in insertion order (created_at ASC)
  const items = db.FranchisePurchaseOrderItem.findMany({
    where: {
      franchise_purchase_order_id: franchise_purchase_order_id
    },
    orderBy: {
      created_at: "asc"
    },
    skip: (pagination.page - 1) * pagination.limit,
    take: pagination.limit
  });

  // 3. Get total count for pagination metadata
  const totalCount = db.FranchisePurchaseOrderItem.count({
    where: {
      franchise_purchase_order_id: franchise_purchase_order_id
    }
  });

  return {
    data: items,
    total_count: totalCount,
    page: pagination.page,
    limit: pagination.limit
  };
}