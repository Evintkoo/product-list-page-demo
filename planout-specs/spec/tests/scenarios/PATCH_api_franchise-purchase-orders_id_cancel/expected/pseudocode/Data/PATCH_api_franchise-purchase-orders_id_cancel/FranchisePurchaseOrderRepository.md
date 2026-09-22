/**
 * Fetches a FranchisePurchaseOrder by ID, ensuring it belongs to the authenticated user's company.
 */
function findOrderByIdAndCompany(orderId: uuid, companyId: uuid): FranchisePurchaseOrder | null {
  return db.franchise_purchase_orders.findFirst({
    where: {
      id: orderId,
      company_id: companyId
    }
  });
}

/**
 * Updates the workflow state of the order to 'cancelled'.
 */
function updateOrderStateToCancelled(orderId: uuid): FranchisePurchaseOrder {
  return db.franchise_purchase_orders.update({
    where: { id: orderId },
    data: {
      franchise_workflow_state: 'cancelled',
      updated_at: now()
    }
  });
}