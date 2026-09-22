/**
 * Fetches and transforms Franchise Purchase Orders for the Standard List Page.
 * Filters specifically for 'external_standard' order types.
 */
async function getFranchisePurchaseOrders(params: { page: number, limit: number, search?: string }) {
  const response = await fetch("/api/franchise-purchase-orders", {
    method: "GET",
    query: {
      ...params,
      order_type: "external_standard"
    }
  });

  const data = await response.json();

  return data.map(order => ({
    id: order.id,
    documentNumber: order.ref_code, // Linked to detail page
    referenceNo: order.supplier_ref_code || "-",
    createdAt: formatDate(order.created_at),
    dueAt: formatDate(order.due_at),
    receivedAt: order.received_at ? formatDate(order.received_at) : null,
    store: order.store_name,
    supplier: order.supplier_name,
    warehouse: order.warehouse_name, // Note: Expected to be null for standard orders
    status: mapWorkflowState(order.workflow_state),
    isPartial: order.received_partial,
    orderAmount: formatCurrency(order.order_amount),
    receiveAmount: formatCurrency(order.receive_amount),
    user: order.updater_name
  }));
}

/**
 * Maps raw workflow_state to UI labels
 */
function mapWorkflowState(state: string): string {
  if (state === "placed") return "Ordered";
  return state.charAt(0).toUpperCase() + state.slice(1);
}

/**
 * Formatting helpers
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}