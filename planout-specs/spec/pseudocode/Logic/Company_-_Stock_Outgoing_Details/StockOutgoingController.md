/**
 * Orchestrates the UI state based on the document data.
 * Maps fields to the view and handles conditional visibility.
 */
function renderStockOutgoingView(data) {
    const { 
        ref_code, supplier_ref_code, entity_name, source_name, source_type, 
        creator_name, updater_name, notes, created_at, updated_at, due_at, 
        approved_at, journal_ref_code, workflow_state, items 
    } = data;

    // 1. Header Mapping
    const header = {
        refCode: ref_code,
        referenceNumber: supplier_ref_code,
        businessEntity: entity_name,
        sourceLabel: source_type === 'warehouse' ? 'From Warehouse' : 'From Store',
        sourceName: source_name,
        createdBy: creator_name,
        updatedBy: updater_name,
        notes: notes,
        createdAt: created_at,
        updatedAt: updated_at,
        dueDate: due_at,
        approvedDate: approved_at, // Nullable
        journal: journal_ref_code, // Visible only if approved
        workflowState: workflow_state
    };

    // 2. Table Mapping
    const tableRows = items.map(item => ({
        lineNo: item.line_no,
        sku: item.sku,
        productName: item.product_name,
        productCode: item.product_code,
        orderQty: item.order_quantity,
        averageCost: item.average_cost,
        orderAmount: item.order_amount,
        expenseAccount: item.expense_account_name,
        reversalAccount: item.reversal_account_name // Visible only if approved
    }));

    return { header, tableRows };
}

/**
 * Handles button click events for workflow transitions.
 */
async function handleWorkflowAction(id, action) {
    try {
        const updatedData = await updateWorkflowState(id, action);
        // Trigger UI repaint with updatedData (workflow bar, dates, journal, etc.)
        refreshView(updatedData);
    } catch (error) {
        displayErrorMessage(error.message);
    }
}