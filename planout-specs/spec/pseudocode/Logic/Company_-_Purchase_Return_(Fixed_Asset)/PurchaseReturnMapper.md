/**
 * Maps raw API response data to the Table component structure.
 * Ensures consistency between the PurchaseReturn entity and the UI.
 */
function mapPurchaseReturnToTable(data) {
  return {
    documentNumber: data.ref_code,
    createdAt: data.created_at,
    sentAt: data.sent_at,
    approvedDate: data.approved_at,
    toSupplier: data.supplier_id, // <!-- MISSING_FIELD: Supplier.name (for display) -->
    status: data.status
  };
}