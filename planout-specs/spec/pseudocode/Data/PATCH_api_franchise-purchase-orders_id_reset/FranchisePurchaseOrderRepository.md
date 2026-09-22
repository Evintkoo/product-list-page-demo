/**
 * Fetches a FranchisePurchaseOrder by ID and ensures it belongs to the current company context.
 */
function findByIdAndCompany(id: uuid, companyId: uuid): FranchisePurchaseOrder | null {
  return db.FranchisePurchaseOrder.findFirst({
    where: {
      id: id,
      company_id: companyId
    }
  });
}

/**
 * Updates the workflow state of the order to 'draft'.
 * Performs an atomic update check to ensure the state transition is valid.
 */
function resetToDraft(id: uuid): FranchisePurchaseOrder {
  const order = db.FranchisePurchaseOrder.update({
    where: {
      id: id,
      franchise_workflow_state: 'cancelled' // Only allow reset if currently cancelled
    },
    data: {
      franchise_workflow_state: 'draft',
      updated_at: now()
    }
  });

  if (!order) {
    throw new ConflictError("Order is not in a state that allows resetting to draft.");
  }

  return order;
}