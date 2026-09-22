/**
 * Performs business logic validation.
 * Throws 422 or 404 errors if constraints are violated.
 */
async function validatePurchaseOrder(tx, data) {
  // Check for duplicate request_uuid (409 Conflict)
  const existing = await tx('StockOrder').where({ request_uuid: data.request_uuid }).first();
  if (existing) throw new Error('CONFLICT_REQUEST_UUID');

  // Validate Supplier/Product existence and eligibility
  // For 'franchise_external', verify supplier is not internal-only
  // Load supply_price from approved pricing source
  // ... validation logic ...
}