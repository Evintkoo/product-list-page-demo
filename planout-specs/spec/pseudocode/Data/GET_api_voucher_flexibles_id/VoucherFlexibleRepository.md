/**
 * Data access layer for VoucherFlexible entities.
 * Handles direct database interaction for the GET /api/voucher_flexibles/:id endpoint.
 */

function findVoucherById(id: uuid): VoucherFlexible | null {
  // Query the database for a record matching the provided ID
  return database.table("VoucherFlexible").where("id", id).first();
}

/**
 * Validates if the authenticated user has access to the specific voucher.
 * This ensures the 403 Forbidden logic is enforced at the data layer.
 */
function hasAccessToVoucher(userId: uuid, voucher: VoucherFlexible): boolean {
  // Logic: User can access if they are the owner or have administrative privileges
  return voucher.owner_id === userId;
}