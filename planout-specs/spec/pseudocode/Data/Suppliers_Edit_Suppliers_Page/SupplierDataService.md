/**
 * Fetches the full supplier record for the Edit page.
 * Maps to GET /api/supplier/:id
 */
function getSupplierById(id: UUID): Promise<Supplier> {
  return api.get(`/api/supplier/${id}`);
}

/**
 * Updates an existing supplier record.
 * Maps to PATCH /api/supplier/:id
 * Accepts a partial object containing only the fields modified in the UI.
 */
function updateSupplier(id: UUID, data: Partial<Supplier>): Promise<Supplier> {
  return api.patch(`/api/supplier/${id}`, data);
}