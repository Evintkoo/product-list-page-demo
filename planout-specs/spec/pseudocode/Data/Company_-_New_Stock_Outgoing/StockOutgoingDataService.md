/**
 * Fetches initial lookup data for the New Stock Outgoing form.
 * Combines Stores and Warehouses for the "From" dropdown.
 */
function getInitialFormData() {
  return {
    locations: Promise.all([
      fetch('/api/stores').then(res => res.json()),
      fetch('/api/warehouses').then(res => res.json())
    ]),
    accounts: fetch('/api/accounts').then(res => res.json())
  };
}

/**
 * Searches for products based on SKU, Name, or Code.
 */
function searchProducts(query, status = 'active') {
  return fetch(`/api/products?status=${status}&sku_cont=${query}&name_cont=${query}&product_code_cont=${query}`);
}

/**
 * Fetches stock details for a specific product at a specific location.
 */
function getProductStockAtLocation(productId, locationId) {
  return fetch(`/api/products/${productId}/stocks?location_id=${locationId}`);
}

/**
 * Searches for Service Work Orders filtered by the selected location.
 */
function searchServiceWorkOrders(query, locationId) {
  return fetch(`/api/service-work-orders?q=${query}&location_id=${locationId}`);
}

/**
 * Submits the completed Stock Outgoing form.
 */
function createStockOutgoing(payload) {
  return fetch('/api/stock-outgoings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source_id: payload.from.id,
      source_type: payload.from.type,
      supplier_ref_code: payload.referenceNumber,
      due_at: payload.dueDate,
      service_work_order_ids: payload.workOrderIds,
      notes: payload.notes,
      lines: payload.lines.map(line => ({
        product_id: line.productId,
        order_quantity: line.orderQty,
        average_cost: line.averageCost,
        coa_id: line.expenseAccountId
      }))
    })
  });
}