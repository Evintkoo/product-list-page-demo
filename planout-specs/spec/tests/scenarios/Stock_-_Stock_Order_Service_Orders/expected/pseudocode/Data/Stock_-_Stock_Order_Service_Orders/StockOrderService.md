/**
 * Data access layer for Stock Orders filtered by source_type 'service_order'.
 * This service handles the retrieval and mapping of stock orders linked to service requests.
 */

function getServiceStockOrders() {
  // Fetch stock orders from the API filtered by service_order source type
  const response = API.get("/api/stock-orders", {
    params: { source_type: "service_order" }
  });

  // Map the raw API response to the internal StockOrder entity structure
  return response.data.map((item) => ({
    id: item.id,
    ref_code: item.ref_code,
    source_ref_code: item.source_ref_code,
    reference_path: item.reference_path,
    created_at: item.created_at,
    due_at: item.due_at,
    received_at: item.received_at || null,
    store_name: item.store_name,
    warehouse_name: item.warehouse_name,
    workflow_state: item.workflow_state,
    order_amount: item.order_amount,
    receive_amount: item.receive_amount,
    updater_name: item.updater_name
  }));
}