/**
 * Orchestrates the data retrieval for the detail page.
 * Combines the return record with real-time inventory data.
 */
function getSalesOrderReturnDetail(id: uuid, companyId: uuid) {
  const returnRecord = getSalesOrderReturnById(id, companyId);
  
  if (!returnRecord) {
    throw new Error("NOT_FOUND");
  }

  // Enrich each line item with the current stock level from the receiving warehouse
  const enrichedLineItems = returnRecord.line_items.map(item => {
    const currentStock = getProductStockInWarehouse(
      item.product_id, 
      returnRecord.receiving_warehouse_id
    );
    
    return {
      ...item,
      current_stock: currentStock
    };
  });

  return {
    ...returnRecord,
    line_items: enrichedLineItems
  };
}