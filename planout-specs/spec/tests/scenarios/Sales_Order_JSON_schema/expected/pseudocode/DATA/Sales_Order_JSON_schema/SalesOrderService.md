/**
 * Orchestrates the assembly of the Sales Order Detail Response.
 */
function getSalesOrderDetail(salesOrderId: UUID, companyId: UUID): SalesOrderDetailResponse {
  const header = getSalesOrderById(salesOrderId, companyId);
  if (!header) throw new NotFoundError("Sales Order not found");

  const items = getSalesOrderItems(salesOrderId);

  return {
    sales_order_id: header.sales_order_id,
    ref_code: header.ref_code,
    customer_id: header.customer_id,
    customer_name: header.customer_name,
    warehouse_id: header.warehouse_id,
    warehouse_name: header.warehouse_name,
    warehouse_address: header.warehouse_address,
    workflow_state: header.workflow_state,
    closed: header.closed,
    subtotal: header.subtotal,
    tax: header.tax,
    total: header.total,
    created_at: header.created_at,
    updated_at: header.updated_at,
    items: items.map(item => ({
      sales_order_item_id: item.sales_order_item_id,
      product_id: item.product_id,
      product_name: item.product_name,
      sku: item.sku,
      quantity: item.quantity,
      quantity_delivered: item.quantity_delivered,
      unit_price: item.unit_price,
      discount_rate: item.discount_rate,
      subtotal: item.subtotal
    }))
  };
}