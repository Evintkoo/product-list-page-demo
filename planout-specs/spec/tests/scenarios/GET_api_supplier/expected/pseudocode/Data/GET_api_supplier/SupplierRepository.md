/**
 * Fetches the list of suppliers for a specific company.
 * Enforces scoping by company_id and default ordering by name.
 */
function getSuppliersByCompany(companyId: UUID): List<Supplier> {
    return Database.query(
        "SELECT * FROM Supplier WHERE company_id = :companyId ORDER BY name ASC",
        { companyId: companyId }
    );
}