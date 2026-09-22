/**
 * Updates the active status of a specific supplier.
 * Ensures the supplier belongs to the authenticated company context.
 */
FUNCTION updateSupplierStatus(supplier_id: UUID, company_id: UUID, is_active: BOOLEAN):
  // 1. Attempt to update the supplier record
  // We filter by both ID and company_id to ensure data isolation
  result = DB.execute(
    "UPDATE Supplier 
     SET is_active = :is_active, updated_at = NOW() 
     WHERE id = :supplier_id AND company_id = :company_id",
    { supplier_id, company_id, is_active }
  )

  // 2. Check if the record existed and was updated
  IF result.rows_affected == 0:
    // Verify if the supplier exists at all to distinguish between 404 and other errors
    exists = DB.query("SELECT id FROM Supplier WHERE id = :supplier_id", { supplier_id })
    IF exists IS EMPTY:
      THROW Error("SupplierNotFound")
    ELSE:
      THROW Error("AccessDenied") // Supplier exists but belongs to another company

  RETURN {
    "id": supplier_id,
    "is_active": is_active,
    "updated_at": NOW()
  }