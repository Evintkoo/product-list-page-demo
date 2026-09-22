/**
 * Handles inventory adjustments based on physical count variance.
 */

async function completeStockOpname(stockOpnameId: UUID, items: StockOpnameItem[]) {
  return await database.transaction(async (tx) => {
    for (const item of items) {
      const variance = item.counted_qty - item.system_qty;

      if (variance !== 0) {
        // 1. Update Store Stock
        await tx.StoreStocks.updateQuantity(
          { store_id: item.storeId, product_id: item.productId },
          variance
        );

        // 2. Log History
        await tx.StoreStockHistory.insert({
          product_id: item.productId,
          change_qty: variance,
          movement_type: 'Stock Opname',
          reference_code: item.stockOpnameRefCode
        });
      }
    }

    // 3. Finalize Opname status
    await finalizeOpname(tx, stockOpnameId);
  });
}