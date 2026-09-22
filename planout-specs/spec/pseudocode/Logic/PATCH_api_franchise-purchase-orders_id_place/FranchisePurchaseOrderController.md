/**
 * PATCH /api/franchise-purchase-orders/:id/place
 * Transitions a Franchise Purchase Order to 'placed' state.
 */
async function placeFranchisePurchaseOrder(req, res) {
    const { id } = req.params;
    const { company_id } = req.session; // <!-- MISSING_FIELD: Session.company_id -->

    // 1. Validate UUID format
    if (!isValidUuid(id)) {
        return res.status(400).json({ error: "Malformed UUID" });
    }

    // 2. Fetch the order
    const order = await db.FranchisePurchaseOrder.findOne({ where: { id } });

    // 3. Authorization and Existence checks
    if (!order) {
        return res.status(404).json({ error: "Order not found" });
    }

    if (order.company_id !== company_id) {
        return res.status(404).json({ error: "Order not found" });
    }

    if (!isAuthorized(req.user, ['admin', 'manager'])) {
        return res.status(403).json({ error: "Forbidden" });
    }

    // 4. State transition validation
    if (order.franchise_workflow_state !== 'store_confirmed') {
        return res.status(409).json({ 
            error: "Order cannot be placed from current state: " + order.franchise_workflow_state 
        });
    }

    // 5. Perform update
    try {
        const updatedOrder = await db.FranchisePurchaseOrder.update(
            {
                franchise_workflow_state: 'placed',
                placed_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            { where: { id } }
        );

        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}