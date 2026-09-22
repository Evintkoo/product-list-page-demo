/**
 * Data access layer for Supplier operations.
 * Provides the interface for the UI to interact with the Supplier entity
 * and prepares the payload for the deactivation endpoint.
 */

interface SupplierSelection {
  supplier_id: UUID;
  name: string;
  is_active: boolean;
}

/**
 * Fetches the current state of the selected supplier to ensure
 * the deactivation request is performed on the correct record.
 */
function getSelectedSupplier(supplier_id: UUID): SupplierSelection {
  const supplier = database.query("SELECT id, name, is_active FROM Supplier WHERE id = ?", [supplier_id]);
  
  return {
    supplier_id: supplier.id,
    name: supplier.name,
    is_active: supplier.is_active
  };
}

/**
 * API Signature for Deactivation:
 * PATCH /api/suppliers/:id/status
 * 
 * Payload:
 * {
 *   "is_active": false
 * }
 */
function deactivateSupplier(supplier_id: UUID) {
  return api.patch(`/api/suppliers/${supplier_id}/status`, {
    is_active: false
  });
}