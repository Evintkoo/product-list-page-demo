/**
 * Executes the creation of a Stock Order and its associated items 
 * within a single database transaction.
 */
async function createStockOrderTransaction(orderData, itemsData, context) {
  return await database.transaction(async (tx) => {
    
    // 1. Generate primary key and system-managed fields
    const stockOrderId = generateUuid();
    const now = getCurrentTimestamp();
    
    // 2. Insert Stock Order
    const newOrder = await tx.insert('StockOrder', {
      id: stockOrderId,
      company_id: context.company_id,
      creator_id: context.user_id,
      updater_id: context.user_id,
      created_at: now,
      updated_at: now,
      ...orderData
    });

    // 3. Insert Stock Order Items
    for (const item of itemsData) {
      await tx.insert('StockOrderItem', {
        id: generateUuid(),
        stock_order_id: stockOrderId,
        created_at: now,
        updated_at: now,
        ...item
      });
    }

    return newOrder;
  });
}

/**
 * Checks for existing reference codes to prevent conflicts.
 */
async function isRefCodeUnique(refCode, companyId) {
  const existing = await database.find('StockOrder', { 
    where: { ref_code: refCode, company_id: companyId } 
  });
  return existing === null;
}