/**
 * Handles the retrieval of Stock Orders based on provided filters.
 * Endpoint: GET /api/stock-opname
 */
function getStockOpname(request) {
    // 1. Validate mandatory query parameter
    if (request.query.stock_type !== 'warehouse') {
        return respond(400, { error: "Invalid stock_type. Must be 'warehouse'." });
    }

    // 2. Initialize query builder for StockOrder entity
    let query = Database.selectFrom(StockOrder);

    // 3. Apply mandatory filter
    query.where(StockOrder.source_type, '=', 'stock_order');

    // 4. Apply optional filters if present
    if (request.query.ref_code) {
        // Partial match on ref_code OR supplier_ref_code
        query.where(
            or(
                StockOrder.ref_code.contains(request.query.ref_code),
                StockOrder.supplier_ref_code.contains(request.query.ref_code)
            )
        );
    }

    if (request.query.from_date) {
        query.where(StockOrder.created_at, '>=', request.query.from_date);
    }

    if (request.query.to_date) {
        query.where(StockOrder.created_at, '<=', request.query.to_date);
    }

    if (request.query.store_id) {
        query.where(StockOrder.to_store_id, '=', request.query.store_id);
    }

    if (request.query.status) {
        query.where(StockOrder.workflow_state, '=', request.query.status);
    }

    // 5. Execute query and return results
    try {
        const results = query.execute();
        return respond(200, results);
    } catch (error) {
        return respond(500, { error: "Internal server error during lookup." });
    }
}