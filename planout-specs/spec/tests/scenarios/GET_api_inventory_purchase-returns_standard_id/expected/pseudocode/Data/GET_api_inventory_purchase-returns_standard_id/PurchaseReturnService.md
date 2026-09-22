/**
 * Orchestrates the retrieval and transformation of the Purchase Return data.
 */
function getPurchaseReturnDetails(id: uuid, userContext: UserContext) {
  // 1. Fetch raw data from repository
  const data = PurchaseReturnRepository.getPurchaseReturnStandardById(id, userContext.companyId);

  // 2. Map to the API response schema
  return {
    header: {
      id: data.id,
      workflow_state: data.workflow_state,
      created_at: data.created_at
    },
    references: {
      purchase_order: data.purchaseOrder,
      purchase_delivery: data.purchaseDelivery,
      purchase_invoice: data.purchaseInvoice
    },
    entities: {
      warehouse: data.warehouse,
      supplier: data.supplier
    },
    financials: {
      amount_summary: calculateTotals(data.items),
      payment_summary: data.payment_summary,
      journal_references: data.journalReferences
    },
    items: data.items,
    // Logic to determine available actions based on current workflow state
    available_actions: WorkflowEngine.getAvailableActions(data.workflow_state),
    audit: {
      created_at: data.created_at,
      updated_at: data.updated_at
    }
  };
}