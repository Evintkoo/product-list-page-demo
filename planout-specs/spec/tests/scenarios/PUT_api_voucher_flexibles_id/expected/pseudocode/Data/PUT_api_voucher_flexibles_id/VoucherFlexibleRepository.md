/**
 * Data access layer for VoucherFlexible entities.
 * Handles persistence logic and constraint checking.
 */

// Find a voucher by its unique identifier
function findById(id) {
  return db.table("VoucherFlexible").where("id", id).first();
}

// Check if a SKU is already taken by another voucher (for conflict detection)
function existsBySkuExcludingId(sku, id) {
  return db.table("VoucherFlexible")
    .where("sku", sku)
    .whereNot("id", id)
    .exists();
}

// Update the voucher record in the database
function updateVoucher(id, data) {
  return db.table("VoucherFlexible")
    .where("id", id)
    .update({
      sku: data.sku,
      name: data.name,
      description: data.description,
      value: data.value,
      updated_at: CURRENT_TIMESTAMP
    })
    .returning("*");
}