/**
 * Fetches a single Franchise Purchase Order header by ID.
 * Enforces multi-tenancy by requiring the company_id of the authenticated user.
 */
function findById(id: UUID, companyId: UUID): FranchisePurchaseOrder | null {
  return db.franchise_purchase_orders.findFirst({
    where: {
      id: id,
      company_id: companyId
    }
  });
}