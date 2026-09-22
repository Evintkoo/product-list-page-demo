/**
 * Handles persistence logic for Flexible Vouchers.
 */
class VoucherRepository {
  
  /**
   * Persists a new flexible voucher to the database.
   * @param voucherData - The validated data object from the service layer.
   * @returns The created FlexibleVoucher entity.
   */
  async createFlexibleVoucher(voucherData) {
    // 1. Check for SKU conflict
    const existing = await db.FlexibleVoucher.findUnique({
      where: { sku: voucherData.sku }
    });

    if (existing) {
      throw new ConflictError("A voucher with this SKU already exists.");
    }

    // 2. Insert new record with system-generated fields
    const newVoucher = await db.FlexibleVoucher.create({
      data: {
        ...voucherData,
        id: generateUuid(),
        created_at: getCurrentTimestamp(),
        updated_at: getCurrentTimestamp()
      }
    });

    return newVoucher;
  }
}