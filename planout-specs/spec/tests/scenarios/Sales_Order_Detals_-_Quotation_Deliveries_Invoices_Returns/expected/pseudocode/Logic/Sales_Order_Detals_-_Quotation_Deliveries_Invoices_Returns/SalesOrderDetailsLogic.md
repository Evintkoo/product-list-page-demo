/**
 * Orchestrates the data fetching for the Sales Order Details page.
 * Triggered on component mount.
 */
async function initializeSalesOrderPage(salesOrderId: string) {
  // 1. Verify Authentication
  const session = await fetch("/api/auth/me");
  if (!session.ok) {
    return redirectTo("/login");
  }

  // 2. Fetch primary Sales Order data
  const salesOrder = await fetch(`/api/sales-orders/${salesOrderId}`);
  const orderData = await salesOrder.json();
  
  // 3. Fetch related entities in parallel
  const [returns, deliveries, invoices, quotations] = await Promise.all([
    fetch(`/api/sales-order/returns?sales_order_id=${salesOrderId}`).then(r => r.json()),
    fetch(`/api/sales-deliveries?sales_order_id=${salesOrderId}`).then(r => r.json()),
    fetch(`/api/sales-invoices?sales_order_id=${salesOrderId}`).then(r => r.json()),
    fetch(`/api/sales-quotations?sales_order_id=${salesOrderId}`).then(r => r.json())
  ]);

  return {
    orderData,
    returns,
    deliveries,
    invoices,
    quotations
  };
}