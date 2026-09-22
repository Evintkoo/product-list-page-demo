/**
 * Maps raw API response objects to the UI-friendly format required by the table.
 */
FUNCTION mapStockOrderResponse(data: Array<StockOrder>):
  RETURN data.map(item => ({
    ref_code: item.ref_code,
    source_ref_code: item.source_ref_code,
    created_at: item.created_at,
    due_at: item.due_at,
    received_at: item.received_at,
    store_name: item.store_name,
    warehouse_name: item.warehouse_name,
    workflow_state: item.workflow_state,
    order_amount: item.order_amount,
    receive_amount: item.receive_amount,
    updater_name: item.updater_name
  }))