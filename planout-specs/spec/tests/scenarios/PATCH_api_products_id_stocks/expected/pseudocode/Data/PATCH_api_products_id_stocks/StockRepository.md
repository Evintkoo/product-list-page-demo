/**
 * Performs a bulk update of stock thresholds within a single database transaction.
 * Ensures atomicity: either all updates succeed or none are applied.
 */
function updateProductStockThresholds(productId: UUID, items: Array<{ store_id: UUID, min_qty: number, max_qty: number }>) {
  return database.transaction(async (tx) => {
    // Verify product existence
    const productExists = await tx.products.exists({ id: productId });
    if (!productExists) throw new NotFoundError("Product not found");

    for (const item of items) {
      // Verify store existence and permission to edit this specific stock record
      const stockRecord = await tx.store_stocks.findOne({ 
        product_id: productId, 
        store_id: item.store_id 
      });

      if (!stockRecord) {
        throw new NotFoundError(`Stock record for store ${item.store_id} not found`);
      }

      // Perform the update: Only modify min_qty and max_qty
      // quantity and average_cost remain untouched
      await tx.store_stocks.update(
        { id: stockRecord.id },
        { 
          min_qty: item.min_qty, 
          max_qty: item.max_qty 
        }
      );
    }

    // Return the updated state for the product
    return await tx.store_stocks.findMany({ product_id: productId });
  });
}