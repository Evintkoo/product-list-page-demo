/**
 * Retrieves a single supplier record by ID, scoped to the authenticated user's company.
 * 
 * @param supplierId - The UUID of the supplier to fetch.
 * @param companyId - The UUID of the company the user belongs to.
 * @returns The Supplier record if found and authorized, otherwise null.
 */
function getSupplierById(supplierId: UUID, companyId: UUID): Supplier | null {
    return db.Supplier.findFirst({
        where: {
            id: supplierId,
            company_id: companyId
        }
    });
}