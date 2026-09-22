/**
 * Fetches the complete Stock Outgoing document including all related entities.
 * Enforces company scoping via the session context.
 */
function getStockOutgoingDetail(id: UUID, companyId: UUID) {
  // 1. Retrieve the main document
  const document = db.StockOutgoing.findFirst({
    where: {
      id: id,
      company_id: companyId
    }
  });

  if (!document) {
    throw new Error("NOT_FOUND");
  }

  // 2. Fetch associated lines
  const lines = db.StockOutgoingLine.findMany({
    where: { stock_outgoing_id: document.id }
  });

  // 3. Fetch linked Work Orders
  const workOrders = db.WorkOrder.findMany({
    where: { stock_outgoing_id: document.id }
  });

  // 4. Fetch linked Stock Orders
  const stockOrders = db.StockOrder.findMany({
    where: { stock_outgoing_id: document.id }
  });

  // 5. Assemble the response object
  return {
    ...document,
    lines: lines,
    work_orders: workOrders,
    stock_orders: stockOrders
  };
}