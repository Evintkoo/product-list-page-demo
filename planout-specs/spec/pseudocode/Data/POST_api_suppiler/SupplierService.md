/**
 * Business logic layer for Supplier operations.
 * Orchestrates repository calls and enforces data integrity.
 */

FUNCTION registerNewSupplier(payload: Object):
    // 1. Check for existing supplier to prevent duplicates (409 Conflict)
    SET existingSupplier = CALL findSupplierByTaxId(payload.tax_id)
    IF existingSupplier IS NOT NULL:
        THROW Error("Supplier with this Tax ID already exists", "CONFLICT")

    // 2. Validate required fields (400 Bad Request)
    IF payload.name IS EMPTY OR payload.tax_id IS EMPTY OR payload.email IS EMPTY:
        THROW Error("Missing required fields", "BAD_REQUEST")

    // 3. Persist to database
    TRY:
        RETURN CALL createSupplier(payload)
    CATCH:
        THROW Error("Database operation failed", "INTERNAL_SERVER_ERROR")