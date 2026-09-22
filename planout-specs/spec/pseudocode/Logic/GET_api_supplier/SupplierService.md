/**
 * Logic layer for Supplier data access
 */
const SupplierService = {
    /**
     * Retrieves all suppliers for a specific company, ordered by name ascending.
     */
    findAllByCompany: (companyId) => {
        return Database.Supplier.findMany({
            where: {
                company_id: companyId
            },
            orderBy: {
                name: "asc"
            }
        });
    }
};