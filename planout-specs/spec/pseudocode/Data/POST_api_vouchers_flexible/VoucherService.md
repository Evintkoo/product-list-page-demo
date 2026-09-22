/**
 * Orchestrates business logic and validation for voucher operations.
 */
class VoucherService {
  
  /**
   * Validates input and triggers persistence.
   */
  async processFlexibleVoucherCreation(payload) {
    // 1. Schema Validation (422 Unprocessable Entity)
    this.validateSchema(payload);

    // 2. Persistence
    try {
      return await voucherRepository.createFlexibleVoucher(payload);
    } catch (error) {
      // Map repository errors to API response codes
      if (error instanceof ConflictError) {
        throw new HttpError(409, error.message);
      }
      throw new HttpError(500, "Internal Server Error");
    }
  }

  private validateSchema(payload) {
    if (!payload.sku || !payload.name || !payload.value) {
      throw new HttpError(422, "Missing required fields: sku, name, or value.");
    }
  }
}