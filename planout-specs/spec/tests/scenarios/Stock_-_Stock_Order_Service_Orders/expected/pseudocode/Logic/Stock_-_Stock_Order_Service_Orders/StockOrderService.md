/**
 * Fetches filtered Stock Orders specifically for Service Orders.
 * Maps the raw StockOrder entity data to the UI table structure.
 */
async function fetchServiceStockOrders(filters: {
  ref_code?: string,
  source_ref_code?: string,
  created_at_from?: string,
  created_at_to?: string,
  store_id?: string,
  warehouse_id?: string,
  workflow_state?: string,
  limit: number,
  offset: number
}) {
  const queryParams = new URLSearchParams({
    source_type: 'service_order',
    ...filters
  });

  const response = await fetch(`/api/stock-orders?${queryParams.toString()}`);
  const data = await response.json();

  return data.map((order: StockOrder) => ({
    id: order.id,
    refCode: order.ref_code,
    sourceRefCode: order.source_ref_code,
    referencePath: order.reference_path,
    date: order.created_at,
    dueAt: order.due_at,
    receivedAt: order.received_at, // Can be null
    store: order.store_name,
    warehouse: order.warehouse_name,
    status: order.workflow_state,
    orderAmount: order.order_amount,
    receiveAmount: order.receive_amount,
    user: order.updater_name
  }));
}