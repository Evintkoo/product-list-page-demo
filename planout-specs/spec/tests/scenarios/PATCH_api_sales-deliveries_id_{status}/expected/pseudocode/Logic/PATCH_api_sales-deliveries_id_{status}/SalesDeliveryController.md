/**
 * PATCH /api/sales-deliveries/:id/:status
 * Transitions the workflow_state of a SalesDelivery.
 */
async function updateSalesDeliveryStatus(req, res) {
    const { id, status } = req.params;

    // 1. Validate status parameter
    if (!['delivered', 'voided'].includes(status)) {
        return res.status(400).json({ error: "Invalid status. Must be 'delivered' or 'voided'." });
    }

    // 2. Start Database Transaction
    await db.transaction(async (trx) => {
        
        // 3. Lock and fetch SalesDelivery
        const delivery = await trx('SalesDelivery')
            .where({ id })
            .forUpdate()
            .first();

        if (!delivery) {
            return res.status(404).json({ error: "Sales delivery not found." });
        }

        // 4. Check workflow state (Must be 'draft')
        if (delivery.workflow_state !== 'draft') {
            return res.status(409).json({ error: "Only draft deliveries can be transitioned." });
        }

        // 5. Perform transition
        await trx('SalesDelivery')
            .where({ id })
            .update({ workflow_state: status });

        // 6. Handle side effects for 'delivered' status
        if (status === 'delivered') {
            // Lock and update parent SalesOrder
            const order = await trx('SalesOrder')
                .where({ id: delivery.sales_order_id })
                .forUpdate()
                .first();

            if (order) {
                // Business Logic: Update order state and closed status
                // Note: Logic assumes recomputation based on delivery completion
                await trx('SalesOrder')
                    .where({ id: delivery.sales_order_id })
                    .update({ 
                        workflow_state: 'completed', <!-- MISSING_FIELD: SalesOrder.workflow_state_value -->
                        closed: true 
                    });
            }
        }

        // 7. Return success
        return res.status(200).json({
            id: delivery.id,
            workflow_state: status
        });
    }).catch(err => {
        return res.status(500).json({ error: "Internal server error during transition." });
    });
}