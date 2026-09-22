/**
 * Data shapes for the API layer
 */

TYPE SupplierStatusUpdateRequest = {
  "is_active": BOOLEAN
}

TYPE SupplierStatusUpdateResponse = {
  "id": UUID,
  "is_active": BOOLEAN,
  "updated_at": DATETIME
}