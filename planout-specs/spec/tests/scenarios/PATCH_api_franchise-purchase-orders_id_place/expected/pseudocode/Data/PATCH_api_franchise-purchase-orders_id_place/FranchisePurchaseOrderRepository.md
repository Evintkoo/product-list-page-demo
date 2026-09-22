/**
 * Data access layer for Franchise Purchase Orders.
 * Handles state transitions and persistence for the placement process.
 */

// Fetches a purchase order by ID, ensuring it belongs to the authenticated company context
FUNCTION findOrderById(orderId: UUID, companyId: UUID):
    RETURN FranchisePurchaseOrder.findFirst({
        WHERE: {
            id: orderId,
            company_id: companyId
        }
    })

// Updates the order state to 'placed' and records the timestamp
FUNCTION transitionToPlaced(orderId: UUID):
    RETURN FranchisePurchaseOrder.update({
        WHERE: { id: orderId },
        DATA: {
            franchise_workflow_state: "placed",
            placed_at: CURRENT_TIMESTAMP,
            updated_at: CURRENT_TIMESTAMP
        }
    })