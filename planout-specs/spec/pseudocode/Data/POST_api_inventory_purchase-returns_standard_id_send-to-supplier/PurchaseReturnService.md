/**
 * Logic to transition the PurchaseReturnStandard to 'Sent to Supplier'.
 * Validates state and performs the update.
 */
function sendToSupplier(id, userId, companyId) {
  const record = findByIdAndCompany(id, companyId);

  if (!record) {
    throw new Error("NOT_FOUND");
  }

  if (record.workflow_state !== 'Draft') {
    throw new Error("CONFLICT_INVALID_STATE");
  }

  const updatedRecord = updateWorkflowState(id, {
    workflow_state: 'Sent to Supplier',
    sent_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    updated_by: userId
  });

  return updatedRecord;
}