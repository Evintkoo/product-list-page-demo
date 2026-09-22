/**
 * Finds a supplier by ID and ensures it belongs to the authenticated user's company.
 * @param id - The UUID of the supplier.
 * @param company_id - The UUID of the company from the authenticated session.
 */
function findSupplierByIdAndCompany(id: UUID, company_id: UUID): Supplier | null {
  return db.Supplier.findFirst({
    where: {
      id: id,
      company_id: company_id
    }
  });
}

/**
 * Checks if a supplier_code is already in use by another supplier within the same company.
 * @param company_id - The UUID of the company.
 * @param supplier_code - The code to check.
 * @param exclude_id - The ID of the current supplier to ignore during the check.
 */
function isSupplierCodeUnique(company_id: UUID, supplier_code: string, exclude_id: UUID): boolean {
  const existing = db.Supplier.findFirst({
    where: {
      company_id: company_id,
      supplier_code: supplier_code,
      id: { not: exclude_id }
    }
  });
  return existing === null;
}

/**
 * Updates the supplier record with the provided data.
 * @param id - The UUID of the supplier.
 * @param data - The sanitized object containing only editable fields.
 */
function updateSupplier(id: UUID, data: Partial<Supplier>): Supplier {
  return db.Supplier.update({
    where: { id: id },
    data: data
  });
}