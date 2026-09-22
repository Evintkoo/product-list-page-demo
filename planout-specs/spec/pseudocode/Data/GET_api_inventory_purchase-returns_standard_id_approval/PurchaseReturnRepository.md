/**
 * Fetches the full aggregate for a Purchase Return Standard approval view.
 * Validates existence within the company scope and current workflow state.
 */
function getPurchaseReturnForApproval(id: UUID, companyId: UUID) {
  const record = db.PurchaseReturn.findFirst({
    where: { 
      id: id,
      company_id: companyId 
    },
    include: {
      warehouse: true,
      supplier: true,
      items: true
    }
  });

  if (!record) {
    throw new Error("NOT_FOUND");
  }

  // Business Rule: Only allow approval if state is 'Sent to Supplier'
  if (record.workflow_state !== 'Sent to Supplier') {
    throw new Error("CONFLICT_INVALID_STATE");
  }

  return record;
}