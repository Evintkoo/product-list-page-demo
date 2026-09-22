/**
 * Fetches a single Sales Order and its associated line items.
 * Enforces multi-tenancy by requiring company_id from the authenticated session.
 */
function findSalesOrderById(orderId: uuid, companyId: uuid) {
  // Query the SalesOrder table
  // Filter by:
  // 1. id = orderId
  // 2. company_id = companyId
  // 3. is_store_wholesale = false (ensures only company sales orders are returned)
  const order = db.SalesOrder.findOne({
    where: {
      id: orderId,
      company_id: companyId,
      is_store_wholesale: false
    }
  });

  if (!order) {
    return null;
  }

  // Fetch associated line items for the order
  const items = db.SalesOrderItem.findMany({
    where: {
      sales_order_id: order.id
    }
  });

  return {
    ...order,
    items: items
  };
}