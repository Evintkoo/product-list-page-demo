/**
 * Orchestrates the data retrieval for the Sales Order detail page.
 */
function getSalesOrderDetail(orderId: uuid, session: Session) {
  // 1. Validate session
  if (!session || !session.companyId) {
    throw new UnauthorizedError("Session missing or invalid");
  }

  // 2. Retrieve data from repository
  const salesOrder = findSalesOrderById(orderId, session.companyId);

  // 3. Handle 404 if order not found or access denied due to scope
  if (!salesOrder) {
    throw new NotFoundError("Sales order not found");
  }

  // 4. Return the structured response
  return {
    id: salesOrder.id,
    status: salesOrder.status,
    items: salesOrder.items.map(item => ({
      product_name: item.product_name,
      quantity: item.quantity,
      price: item.price
    })),
    created_at: salesOrder.created_at
  };
}