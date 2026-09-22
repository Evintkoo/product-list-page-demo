/**
 * Fetches the PurchaseReturnStandard by ID within the authenticated company scope.
 * @param {string} id - The UUID of the record.
 * @param {string} companyId - The UUID of the current company.
 */
function findByIdAndCompany(id, companyId) {
  return db.PurchaseReturnStandard.findFirst({
    where: { id: id, company_id: companyId }
  });
}

/**
 * Updates the PurchaseReturnStandard record with new workflow state and metadata.
 * @param {string} id - The UUID of the record.
 * @param {Object} data - The fields to update.
 */
function updateWorkflowState(id, data) {
  return db.PurchaseReturnStandard.update({
    where: { id: id },
    data: {
      workflow_state: data.workflow_state,
      sent_at: data.sent_at,
      updated_at: data.updated_at,
      updated_by: data.updated_by
    }
  });
}