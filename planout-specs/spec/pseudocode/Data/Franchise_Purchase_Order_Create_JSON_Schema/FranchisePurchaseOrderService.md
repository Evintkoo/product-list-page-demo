/**
 * Orchestrates the creation of a Franchise Purchase Order within a single transaction.
 */
async function createFranchisePurchaseOrder(
  type: 'internal' | 'external',
  requestBody: FranchisePurchaseOrderCreateRequest,
  userContext: { company_id: string; user_id: string }
) {
  return await database.transaction(async (tx) => {
    // 1. Validate request and business rules
    await validateFranchisePurchaseOrder(type, requestBody, userContext, tx);

    // 2. Insert Stock Order header
    const stockOrder = await insertStockOrder(requestBody, type, userContext, tx);

    // 3. Insert Stock Order Items with snapshots
    await insertStockOrderItems(stockOrder.stock_order_id, requestBody.items, requestBody, tx);

    // 4. Recalculate header totals
    await updateStockOrderTotal(stockOrder.stock_order_id, tx);

    // 5. Insert initial workflow history
    await insertWorkflowHistory(stockOrder.stock_order_id, userContext.user_id, tx);

    // 6. Return the fully populated object
    return await getFranchisePurchaseOrderResponse(stockOrder.stock_order_id, tx);
  });
}