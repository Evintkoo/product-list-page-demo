FUNCTION updateSalesInvoiceWorkflow(invoiceId, action):
    // 1. Fetch the current invoice state
    invoice = DATABASE.SalesInvoice.find(id = invoiceId)
    IF NOT invoice:
        RETURN ERROR 404 "Sales Invoice not found"

    // 2. Determine the target state based on current state and requested action
    targetState = CALCULATE_TRANSITION(invoice.workflow_state, action)
    
    IF targetState IS NULL:
        RETURN ERROR 422 "Invalid action for current workflow state"

    // 3. Execute update within a database transaction
    START TRANSACTION
        // Update the invoice state
        invoice.workflow_state = targetState
        invoice.updated_at = CURRENT_TIMESTAMP
        DATABASE.SalesInvoice.update(invoice)

        // Log the transition
        newTransition = {
            id: GENERATE_UUID(),
            sales_invoice_id: invoice.id,
            from_state: invoice.workflow_state, <!-- MISSING_FIELD: WorkflowTransition.from_state -->
            to_state: targetState,
            action: action,
            performed_at: CURRENT_TIMESTAMP
        }
        DATABASE.WorkflowTransition.insert(newTransition)
    COMMIT TRANSACTION

    RETURN invoice

FUNCTION CALCULATE_TRANSITION(currentState, action):
    // Define state machine rules
    SWITCH currentState:
        CASE "draft":
            IF action == "approve" RETURN "approved"
            IF action == "send" RETURN "sent"
            IF action == "cancel" RETURN "cancelled"
        CASE "approved":
            IF action == "send" RETURN "sent"
            IF action == "reset" RETURN "draft"
    
    RETURN NULL // Invalid transition