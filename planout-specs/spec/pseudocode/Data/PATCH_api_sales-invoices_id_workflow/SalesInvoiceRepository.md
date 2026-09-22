/**
 * Fetches the current state of the Sales Invoice to validate transition rules.
 */
function findById(id: uuid): SalesInvoice {
    return db.query("SELECT * FROM SalesInvoice WHERE id = ?", [id]);
}

/**
 * Updates the workflow_state and records the transition history.
 */
function updateWorkflowState(id: uuid, newState: string): SalesInvoice {
    db.transaction(() => {
        // Update the invoice state
        db.execute(
            "UPDATE SalesInvoice SET workflow_state = ?, updated_at = NOW() WHERE id = ?",
            [newState, id]
        );

        // Log the transition for audit purposes
        db.execute(
            "INSERT INTO WorkflowTransition (id, sales_invoice_id, to_state, performed_at) VALUES (?, ?, ?, NOW())",
            [generateUuid(), id, newState]
        );
    });

    return findById(id);
}