/**
 * Orchestrates the page load logic.
 * workflow_state is assumed to be part of the header response.
 */
async function loadPurchaseOrderDetails(id: string) {
  const [header, items] = await Promise.all([
    getFranchisePurchaseOrder(id),
    getFranchisePurchaseOrderItems(id)
  ]);

  // Logic: workflow_state determines UI behavior
  // <!-- MISSING_FIELD: FranchisePurchaseOrder.workflow_state -->
  const workflowState = header.workflow_state; 

  if (workflowState !== 'placed') {
    return {
      header,
      items: [],
      uiState: 'NOT_AWAITING_RECEIPT'
    };
  }

  return {
    header,
    items,
    uiState: 'READY'
  };
}