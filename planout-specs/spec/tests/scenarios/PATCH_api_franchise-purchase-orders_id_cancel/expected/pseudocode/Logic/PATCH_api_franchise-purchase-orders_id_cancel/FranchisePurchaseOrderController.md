/**
 * Handles the cancellation of a Franchise Purchase Order.
 * Endpoint: PATCH /api/franchise-purchase-orders/:id/cancel
 */
async function cancelFranchisePurchaseOrder(req, res) {
    const { id } = req.params;
    const currentUser = req.session.user; // <!-- MISSING_FIELD: User.id -->

    // 1. Validate UUID format
    if (!isValidUuid(id)) {
        return res.status(400).json({ error: "Invalid order ID format" });
    }

    // 2. Authorization Check
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'manager')) {
        return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }

    // 3. Fetch Order
    const order = await db.FranchisePurchaseOrder.findOne({ where: { id } });

    if (!order) {
        return res.status(404).json({ error: "Purchase order not found" });
    }

    // 4. Verify Company Ownership
    if (order.company_id !== currentUser.company_id) {
        return res.status(404).json({ error: "Purchase order not found" });
    }

    // 5. State Transition Validation
    // Allowed states: 'draft' or 'store_confirmed'
    const allowedStates = ['draft', 'store_confirmed'];
    if (!allowedStates.includes(order.franchise_workflow_state)) {
        return res.status(409).json({ 
            error: `Cannot cancel order in state: ${order.franchise_workflow_state}` 
        });
    }

    // 6. Perform Update
    try {
        order.franchise_workflow_state = 'cancelled';
        order.updated_at = getCurrentTimestamp();
        
        await order.save();

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error during cancellation" });
    }
}