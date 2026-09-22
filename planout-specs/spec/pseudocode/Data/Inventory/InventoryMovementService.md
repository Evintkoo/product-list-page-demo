/**
 * Handles atomic inventory transitions for Stock Orders.
 * Ensures that Warehouse and Store stock levels are updated in sync with 
 * workflow state changes.
 */

async function processStockOrderTransition(
  stockOrderId: UUID,
  newStatus: 'sent' | 'received',
  items: StockOrderItem[]
) {
  return await database.transaction(async (tx) => {
    if (newStatus === 'sent') {
      for (const item of items) {
        // 1. Decrease Warehouse Stock
        await tx.WarehouseStock.decrement(
          { warehouse_id: item.sourceWarehouseId, product_id: item.productId },
          item.sent_qty
        );

        // 2. Log Warehouse History
        await tx.WarehouseStockHistory.insert({
          product_id: item.productId,
          change_qty: -item.sent_qty,
          movement_type: 'Stock Order',
          reference_code: item.stockOrderRefCode
        });
      }
    }

    if (newStatus === 'received') {
      for (const item of items) {
        // 1. Increase Store Stock
        await tx.StoreStocks.increment(
          { store_id: item.destinationStoreId, product_id: item.productId },
          item.received_qty
        );

        // 2. Log Store History
        await tx.StoreStockHistory.insert({
          product_id: item.productId,
          change_qty: item.received_qty,
          movement_type: 'order received',
          reference_code: item.stockOrderRefCode
        });
      }
    }

    // 3. Update Workflow State and History
    await updateWorkflowState(tx, stockOrderId, newStatus);
  });
}