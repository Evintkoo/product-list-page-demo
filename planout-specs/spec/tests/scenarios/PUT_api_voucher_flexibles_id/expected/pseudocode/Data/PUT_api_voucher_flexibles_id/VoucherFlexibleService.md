/**
 * Business logic layer for processing update requests.
 */

async function updateVoucherFlexible(id, payload) {
  // 1. Verify existence
  const existing = await findById(id);
  if (!existing) {
    throw new Error("NOT_FOUND");
  }

  // 2. Check for SKU conflict
  const skuConflict = await existsBySkuExcludingId(payload.sku, id);
  if (skuConflict) {
    throw new Error("CONFLICT_SKU_EXISTS");
  }

  // 3. Perform update
  return await updateVoucher(id, payload);
}