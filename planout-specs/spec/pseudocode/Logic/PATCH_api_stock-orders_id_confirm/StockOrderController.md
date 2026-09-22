/**
 * Handles the confirmation of a Stock Order.
 * Endpoint: PATCH /api/stock-orders/:id/confirm
 */
async function confirmStockOrder(req, res) {
    const { id } = req.params;
    const actorId = req.user.id; // <!-- MISSING_FIELD: AuthContext.user_id -->
    const companyId = req.user.company_id; // <!-- MISSING_FIELD: AuthContext.company_id -->

    try {
        // 1. Fetch the existing StockOrder
        const stockOrder = await db.StockOrder.findOne({ 
            where: { id: id, company_id: companyId } 
        });

        if (!stockOrder) {
            return res.status(404).json({ error: "Stock Order not found" });
        }

        // 2. Validate workflow state (must be 'draft')
        if (stockOrder.workflow_state !== 'draft') {
            return res.status(409).json({ error: "Stock Order must be in draft state to be confirmed" });
        }

        // 3. Execute update and history logging in a transaction
        const result = await db.transaction(async (t) => {
            const now = new Date();

            // Update StockOrder
            const updatedOrder = await stockOrder.update({
                workflow_state: 'confirmed',
                confirmed_at: now,
                updater_id: actorId,
                updated_at: now
            }, { transaction: t });

            // Create history record
            await db.StockOrderWorkflowHistory.create({
                stock_order_id: id,
                from_state: 'draft',
                to_state: 'confirmed',
                created_at: now,
                actor_id: actorId
            }, { transaction: t });

            return updatedOrder;
        });

        return res.status(200).json(result);

    } catch (error) {
        console.error("Confirmation error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}