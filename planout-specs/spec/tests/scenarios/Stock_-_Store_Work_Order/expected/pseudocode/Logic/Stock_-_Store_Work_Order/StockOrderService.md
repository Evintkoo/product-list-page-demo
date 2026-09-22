/**
 * Fetches the list of Stock Orders filtered by source_type 'service_work_order'.
 * Handles the mapping of API response fields to the UI table structure.
 */
async function getWorkOrderStockList(filters: {
  ref_code?: string,
  source_ref_code?: string,
  created_at_from?: string,
  created_at_to?: string,
  store_id?: string,
  warehouse_id?: string,
  workflow_state?: string,
  limit?: number,
  offset?: number
}) {
  const queryParams = new URLSearchParams({
    source_type: 'service_work_order',
    ...filters
  });

  const response = await fetch(`/api/stock-orders?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch stock orders");
  }

  const data = await response.json();

  // Map API response to UI table rows
  return data.map((order: any) => ({
    stock_order_id: order.id,
    ref_code: order.ref_code,
    source_ref_code: order.source_ref_code,
    created_at: order.created_at,
    due_at: order.due_at,
    received_at: order.received_at,
    store_name: order.store_name, // <!-- MISSING_FIELD: Store.name (joined) -->
    warehouse_name: order.warehouse_name, // <!-- MISSING_FIELD: Warehouse.name (joined) -->
    workflow_state: order.workflow_state,
    order_amount: order.order_amount,
    receive_amount: order.receive_amount,
    updater_name: order.updater_name, // <!-- MISSING_FIELD: User.name (joined) -->
    reference_path: `/work-orders/${order.source_ref_code}` // Derived link
  }));
}