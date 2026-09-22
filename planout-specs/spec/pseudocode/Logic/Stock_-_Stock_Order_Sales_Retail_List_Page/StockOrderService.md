/**
 * Fetches and transforms Stock Orders for the Sales Retail List Page.
 * Filters by stock_type = 'sales_retail' and ensures source_type is restricted to sales-related origins.
 */
async function fetchSalesRetailStockOrders(page: number = 0) {
  const limit = 20;
  const offset = page * limit;

  // Execute API call to retrieve stock orders
  const response = await fetch(`/api/stock-orders?stock_type=sales_retail&limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Sales Retail Stock Orders");
  }

  const data = await response.json();

  // Filter and map the response data to the UI table structure
  return data
    .filter((order: any) => ['sale', 'shipping_sale'].includes(order.source_type))
    .map((order: any) => ({
      id: order.id,
      ref_code: order.ref_code,
      source_ref_code: order.source_ref_code,
      created_at: order.created_at,
      due_at: order.due_at,
      received_at: order.received_at,
      store_name: order.store_name,
      warehouse_name: order.warehouse_name,
      workflow_state: order.workflow_state,
      order_amount: order.order_amount,
      receive_amount: order.receive_amount,
      updater_name: order.updater_name
    }));
}