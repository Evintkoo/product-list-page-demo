/**
 * Fetches the complete return document including header and line items.
 * Scoped by company_id to ensure data isolation.
 */
function getSalesOrderReturnById(id: uuid, companyId: uuid) {
  return db.SalesOrderReturn.findFirst({
    where: {
      id: id,
      company_id: companyId
    },
    include: {
      line_items: {
        include: {
          product: true
        }
      }
    }
  });
}

/**
 * Fetches current stock level for a specific product in the designated warehouse.
 */
function getProductStockInWarehouse(productId: uuid, warehouseId: uuid) {
  const inventory = db.Inventory.findFirst({
    where: {
      product_id: productId,
      warehouse_id: warehouseId
    }
  });
  
  return inventory ? inventory.stock_level : 0;
}