function onPageLoad(recordId: string) {
    // 1. Validate Session
    const user = call GET /api/auth/me();
    if (!user) {
        redirect("/login");
        return;
    }

    // 2. Fetch Data
    const returnData = call GET /api/sales-order-returns/:id(id: recordId);
    
    // 3. Render UI based on workflow_state
    renderSalesOrderReturnPage(returnData);
}

function handleWorkflowAction(recordId: string, targetStatus: string) {
    // Trigger confirmation modal based on targetStatus
    openConfirmationModal(targetStatus, () => {
        // On OK, execute state transition
        const updatedData = call PATCH /api/sales-order-returns/:id/:status(
            id: recordId, 
            status: targetStatus
        );
        
        // Repaint UI components with updated fields
        updateWorkflowBar(updatedData.workflow_state);
        updateHeaderDates(updatedData.received_at, updatedData.approved_at);
        updateJournalField(updatedData.journal_id);
        updateAuditFields(updatedData.updated_at, updatedData.updated_by);
    });
}