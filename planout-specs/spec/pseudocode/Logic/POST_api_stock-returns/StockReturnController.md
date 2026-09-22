/**
 * Handles the creation of a new stock return record.
 * Endpoint: POST /api/stock-returns
 */
async function createStockReturn(req, res) {
    // 1. Authentication & Authorization Check
    const user = await AuthService.getCurrentUser(req);
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!PermissionService.canCreateStockReturn(user)) {
        return res.status(403).json({ error: "Forbidden" });
    }

    // 2. Validate Request Payload
    const { from_store_id, to_warehouse_id, internal_supplier_id } = req.body;
    
    if (!from_store_id || !to_warehouse_id || !internal_supplier_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // 3. Delegate to Service Layer
        const newReturn = await StockReturnService.create({
            from_store_id,
            to_warehouse_id,
            internal_supplier_id,
            created_by: user.id,
            status: "PENDING", // <!-- MISSING_FIELD: StockReturn.status_default_value -->
            created_at: new Date().toISOString()
        });

        // 4. Return Success Response
        return res.status(201).json(newReturn);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}