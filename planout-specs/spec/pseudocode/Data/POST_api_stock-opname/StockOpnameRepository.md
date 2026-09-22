/**
 * Executes the creation of a Stock Opname and its associated items 
 * within a single database transaction.
 */
function createStockOpnameTransaction(data: {
  header: Partial<StockOpname>,
  items: Array<Partial<StockOpnameItem>>
}) {
  return database.transaction(async (tx) => {
    // 1. Insert the main Stock Opname record
    const stockOpname = await tx.insert("StockOpname", {
      ...data.header,
      id: generateUuid(),
      ref_code: generateRefCode(),
      created_at: now(),
      updated_at: now()
    });

    // 2. Process and insert each Stock Opname Item
    for (const item of data.items) {
      await tx.insert("StockOpnameItem", {
        ...item,
        id: generateUuid(),
        stock_opname_id: stockOpname.id,
        // System-calculated fields populated at insertion time
        system_qty: fetchCurrentSystemQty(item.product_id),
        average_cost: fetchCurrentAverageCost(item.product_id),
        variance_qty: calculateVariance(item.counted_qty, system_qty),
        adjustment_amount: calculateAdjustment(variance_qty, average_cost)
      });
    }

    return stockOpname;
  });
}

/**
 * Checks if the request_uuid has already been processed to prevent duplicate submissions.
 */
function isDuplicateRequest(requestUuid: string): boolean {
  return database.exists("StockOpname", { request_uuid: requestUuid });
}