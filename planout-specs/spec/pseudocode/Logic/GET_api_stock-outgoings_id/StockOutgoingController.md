/**
 * GET /api/stock-outgoings/:id
 * Retrieves a single Stock Outgoing document including its associated lines,
 * work orders, and stock orders.
 */
async function getStockOutgoing(req, res) {
    const { id } = req.params;
    const { company_id } = req.session; // Derived from authenticated session

    // 1. Fetch the primary StockOutgoing record
    // Ensure the document belongs to the company in the session to enforce scope
    const stockOutgoing = await db.StockOutgoing.findOne({
        where: { 
            id: id,
            company_id: company_id 
        }
    });

    if (!stockOutgoing) {
        return res.status(404).json({ error: "Stock outgoing document not found" });
    }

    // 2. Fetch associated lines
    const lines = await db.StockOutgoingLine.findAll({
        where: { stock_outgoing_id: id }
    });

    // 3. Fetch linked Work Orders
    const workOrders = await db.WorkOrder.findAll({
        where: { stock_outgoing_id: id }
    });

    // 4. Fetch linked Stock Orders
    const stockOrders = await db.StockOrder.findAll({
        where: { stock_outgoing_id: id }
    });

    // 5. Construct and return the response
    // Note: journal_ref_code and reversal_account_name will be null if not yet approved
    return res.status(200).json({
        ...stockOutgoing,
        lines: lines,
        work_orders: workOrders,
        stock_orders: stockOrders
    });
}