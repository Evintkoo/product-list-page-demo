/**
 * Handles the reset transition for a Franchise Purchase Order.
 * Transitions the order from 'cancelled' to 'draft'.
 */
async function resetPurchaseOrder(req, res) {
    const { id } = req.params;
    const { company_id } = req.session; // <!-- MISSING_FIELD: Session.company_id -->

    // 1. Validate UUID format
    if (!isValidUuid(id)) {
        return res.status(400).json({ error: "Malformed UUID" });
    }

    // 2. Authorization Check
    if (!isUserAdminOrManager(req.user)) {
        return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }

    // 3. Fetch the existing order
    const order = await db.FranchisePurchaseOrder.findOne({
        where: { id: id, company_id: company_id }
    });

    if (!order) {
        return res.status(404).json({ error: "Purchase order not found" });
    }

    // 4. State Transition Validation
    // Only allow reset if the current state is 'cancelled'
    if (order.franchise_workflow_state !== 'cancelled') {
        return res.status(409).json({ 
            error: "Conflict: Order cannot be reset from current state" 
        });
    }

    // 5. Perform the update
    try {
        order.franchise_workflow_state = 'draft';
        order.updated_at = getCurrentTimestamp();
        
        await order.save();

        // 6. Return the updated entity
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}