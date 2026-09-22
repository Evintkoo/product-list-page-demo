/**
 * Handles workflow state transitions for a Sales Invoice.
 */
function updateWorkflowState(sales_invoice_id: UUID, action: string) {
  const invoice = db.find("sales_invoice", { sales_invoice_id });
  
  const transitions = {
    'draft': { 'approve': 'approved', 'send': 'sent', 'cancel': 'cancelled' },
    'approved': { 'send': 'sent', 'reset': 'draft' }
  };

  const nextState = transitions[invoice.workflow_state]?.[action];
  
  if (!nextState) {
    throw new Error("Invalid workflow transition");
  }

  return db.update("sales_invoice", { workflow_state: nextState }, { sales_invoice_id });
}