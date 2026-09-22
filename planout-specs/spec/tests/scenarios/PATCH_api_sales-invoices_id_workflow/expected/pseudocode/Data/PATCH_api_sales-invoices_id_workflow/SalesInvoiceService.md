/**
 * Validates the requested action against the current state and performs the update.
 */
function processWorkflowAction(id: uuid, action: string): SalesInvoice {
    const invoice = SalesInvoiceRepository.findById(id);
    
    if (!invoice) {
        throw new Error("Sales Invoice not found");
    }

    const currentState = invoice.workflow_state;
    const nextState = validateTransition(currentState, action);

    if (!nextState) {
        throw new Error(`Invalid action '${action}' for current state '${currentState}'`);
    }

    return SalesInvoiceRepository.updateWorkflowState(id, nextState);
}

/**
 * Business logic mapping for state transitions.
 */
function validateTransition(current: string, action: string): string | null {
    const transitions = {
        "draft": { "approve": "approved", "send": "sent", "cancel": "cancelled" },
        "approved": { "send": "sent", "reset": "draft" }
    };

    return transitions[current]?.[action] || null;
}