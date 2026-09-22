/**
 * POST /api/franchise-purchase-orders/:type
 * Handles creation of internal/external franchise purchase orders.
 */
async function createFranchisePurchaseOrder(req, res) {
    const { type } = req.params;
    const { 
        from_warehouse_id, to_store_id, supplier_id, 
        supplier_ref_code, due_at, notes, request_uuid, items 
    } = req.body;

    // 1. Authentication & Authorization
    const user = await getAuthenticatedUser(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    
    // Ensure resources belong to user's company
    if (!await verifyCompanyAccess(user.company_id, { from_warehouse_id, to_store_id, supplier_id })) {
        return res.status(403).json({ error: "Forbidden" });
    }

    // 2. Map Type
    const stock_order_type = (type === 'internal') ? 'franchise_internal' : 'franchise_external';

    // 3. Validation
    const validation = await validatePurchaseOrder({
        type,
        stock_order_type,
        from_warehouse_id,
        to_store_id,
        supplier_id,
        items,
        request_uuid
    });

    if (!validation.isValid) {
        return res.status(422).json({ errors: validation.errors });
    }

    // 4. Create Process (Transaction)
    try {
        const result = await db.transaction(async (tx) => {
            // Insert StockOrder
            const stockOrder = await tx.insert('StockOrder', {
                company_id: user.company_id,
                stock_order_type,
                from_warehouse_id,
                to_store_id,
                supplier_id,
                supplier_ref_code,
                due_at,
                notes,
                request_uuid,
                workflow_state: 'draft',
                creator_id: user.id,
                created_at: new Date()
            });

            // Insert Items
            for (const item of items) {
                await tx.insert('StockOrderItem', {
                    stock_order_id: stockOrder.id,
                    product_id: item.product_id,
                    order_qty: item.order_qty,
                    supply_price: item.supply_price, // Loaded during validation
                    store_remark: item.store_remark
                });
            }

            // Update Totals
            await tx.updateTotal('StockOrder', stockOrder.id);

            // Log History
            await tx.insert('StockOrderWorkflowHistory', {
                stock_order_id: stockOrder.id,
                changed_by: user.id,
                workflow_state: 'draft',
                created_at: new Date()
            });

            return stockOrder;
        });

        return res.status(201).json(result);

    } catch (error) {
        if (error.code === 'UNIQUE_VIOLATION') {
            return res.status(409).json({ error: "request_uuid already processed" });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}