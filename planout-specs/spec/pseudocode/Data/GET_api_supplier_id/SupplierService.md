/**
 * Orchestrates the retrieval of supplier details.
 * Handles business logic validation and data access.
 */
function fetchSupplierDetail(supplierId: UUID, userContext: UserContext): Supplier {
    // 1. Validate input format
    if (!isValidUUID(supplierId)) {
        throw new Error("INVALID_SUPPLIER_ID");
    }

    // 2. Retrieve from repository
    const supplier = getSupplierById(supplierId, userContext.companyId);

    // 3. Handle existence and authorization
    // If supplier is null, it either doesn't exist or belongs to another company
    if (!supplier) {
        throw new Error("SUPPLIER_NOT_FOUND");
    }

    return supplier;
}