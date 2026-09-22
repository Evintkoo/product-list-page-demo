/**
 * Fetches initial data for the Franchise Purchase Return form.
 * GET /api/stores: Returns list of stores for "Return From" dropdown.
 * GET /api/suppliers: Returns list of suppliers (filtered by is_internal=true) for "Return To Supplier".
 */
function getFormInitializationData() {
  return {
    stores: fetch("/api/stores"),
    suppliers: fetch("/api/suppliers?is_internal=true")
  };
}

/**
 * Fetches Franchise Purchase Orders on-demand.
 * @param {string} query - Search term (min 3 chars).
 * @param {uuid} storeId - Filter by store.
 * @param {uuid} supplierId - Filter by supplier.
 */
function searchPurchaseOrders(query, storeId, supplierId) {
  if (query.length < 3) return [];
  return fetch(`/api/franchise-purchase-orders?q=${query}&store_id=${storeId}&supplier_id=${supplierId}`);
}

/**
 * Submits the new Franchise Purchase Return.
 * Maps UI form state to the Franchise Purchase Return Create Request JSON Schema.
 */
function createFranchisePurchaseReturn(formData) {
  const payload = {
    sender_location_id: formData.return_from,
    receiver_location_id: formData.return_to_supplier,
    source_order_id: formData.franchise_purchase_order,
    document_no: formData.document_no,
    reference_no: formData.reference_no,
    notes: formData.notes,
    items: formData.items.map(item => ({
      product_id: item.product_id,
      store_qty: item.store_qty,
      order_qty: item.order_qty,
      max_return_qty: item.max_return_qty,
      return_qty: item.return_qty,
      reason: item.reason
    }))
  };

  return fetch("/api/franchise_purchase_returns", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}