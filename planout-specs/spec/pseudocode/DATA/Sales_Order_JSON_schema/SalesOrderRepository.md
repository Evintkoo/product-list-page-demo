/**
 * Fetches a single Sales Order by ID, ensuring company scope.
 * Joins with Warehouses and Users to resolve denormalized display names.
 */
function getSalesOrderById(salesOrderId: UUID, companyId: UUID): SalesOrder | null {
  return db.query(`
    SELECT so.*, wh.address AS warehouse_address
    FROM sales_orders so
    JOIN warehouses wh ON wh.warehouse_id = so.warehouse_id
    JOIN users cu ON cu.user_id = so.creator_id
    JOIN users uu ON uu.user_id = so.updater_id
    WHERE so.sales_order_id = $1 AND so.company_id = $2
  `, [salesOrderId, companyId]);
}

/**
 * Fetches line items for a specific Sales Order.
 */
function getSalesOrderItems(salesOrderId: UUID): SalesOrderItem[] {
  return db.query(`
    SELECT * FROM sales_order_items 
    WHERE sales_order_id = $1 
    ORDER BY created_at ASC
  `, [salesOrderId]);
}