/**
 * Logic to determine which header component to render based on workflow_state.
 */
function getHeaderState(workflowState) {
  const states = {
    'draft': 'Sales Invoice Header - Draft',
    'approved': 'Sales Invoice Header - Approved',
    'sent': 'Sales Invoice Header - Sent',
    'paid': 'Sales Invoice Header - Paid',
    'cancelled': 'Sales Invoice Header - Cancelled'
  };
  return states[workflowState] || 'Sales Invoice Header - Draft';
}

/**
 * Orchestrates the workflow action and subsequent UI refresh.
 */
async function handleWorkflowAction(id, action) {
  try {
    const updatedInvoice = await updateInvoiceWorkflow(id, action);
    
    // Trigger UI refresh with updatedInvoice data:
    // 1. Update workflow status
    // 2. Re-render header state using getHeaderState(updatedInvoice.workflow_state)
    // 3. Update action buttons visibility
    // 4. Refresh detail values in the tab
    return updatedInvoice;
  } catch (error) {
    console.error("Workflow update error:", error);
  }
}