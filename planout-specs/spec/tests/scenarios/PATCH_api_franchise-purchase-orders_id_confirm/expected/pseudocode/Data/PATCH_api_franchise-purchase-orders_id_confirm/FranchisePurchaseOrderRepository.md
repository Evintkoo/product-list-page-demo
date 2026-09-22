/**
 * Fetches a purchase order by ID, ensuring it belongs to the authenticated user's company.
 */
FUNCTION findOrderByIdAndCompany(orderId: UUID, companyId: UUID):
    RETURN FranchisePurchaseOrder WHERE id = orderId AND company_id = companyId

/**
 * Updates the workflow state of the purchase order.
 * Performs an atomic check to ensure the state transition is valid.
 */
FUNCTION updateWorkflowState(orderId: UUID, newState: String):
    UPDATE FranchisePurchaseOrder
    SET franchise_workflow_state = newState, updated_at = CURRENT_TIMESTAMP
    WHERE id = orderId 
    AND franchise_workflow_state = 'draft'