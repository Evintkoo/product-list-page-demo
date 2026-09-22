// Logic to handle the submission of the Stock Return form

function submitStockReturn(payload: {
  from_store_id: string;
  to_warehouse_id?: string;
  to_internal_supplier_id?: string;
  ref_code: string;
  notes: string;
}) {
  // Validate that either to_warehouse_id or to_internal_supplier_id is provided
  if (!payload.to_warehouse_id && !payload.to_internal_supplier_id) {
    throw new Error("Destination (Warehouse or Internal Supplier) is required.");
  }

  // POST request to the Stock Return endpoint
  return apiClient.post("/stock/returns", payload);
}