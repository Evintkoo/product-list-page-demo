/**
 * Handles the creation of a Stock Transfer document.
 * Ensures atomicity and data integrity by snapshotting current stock values.
 */
function createStockTransfer(userId, companyId, requestData) {
    // 1. Idempotency Check
    const existing = db.StockTransfer.find({ request_uuid: requestData.request_uuid });
    if (existing) return existing;

    // 2. Validation
    if (requestData.from_location_id === requestData.to_location_id) {
        throw new Error("422: Source and Destination locations must be different.");
    }
    if (!requestData.items || requestData.items.length === 0) {
        throw new Error("422: Item list cannot be empty.");
    }

    // 3. Transactional Write
    return db.transaction(() => {
        const refCode = requestData.ref_code || generateRefCode();
        
        const transfer = db.StockTransfer.create({
            company_id: companyId,
            ref_code: refCode,
            request_uuid: requestData.request_uuid,
            workflow_state: 'draft',
            from_location_id: requestData.from_location_id,
            to_location_id: requestData.to_location_id,
            total_amount: 0 // Will be updated after lines
        });

        let runningTotal = 0;

        for (const item of requestData.items) {
            if (item.transfered_qty <= 0) throw new Error("422: Quantity must be positive.");

            // Snapshot current stock values from the system
            const currentSourceStock = inventoryService.getCurrentStock(item.product_id, transfer.from_location_id);
            const currentDestStock = inventoryService.getCurrentStock(item.product_id, transfer.to_location_id);
            const avgCost = inventoryService.getAverageCost(item.product_id);

            const lineAmount = item.transfered_qty * avgCost;
            runningTotal += lineAmount;

            db.StockTransferLine.create({
                stock_transfer_id: transfer.id,
                product_id: item.product_id,
                transfered_qty: item.transfered_qty,
                source_qty_snapshot: currentSourceStock,
                dest_qty_snapshot: currentDestStock,
                sender_average_cost: avgCost,
                line_amount: lineAmount
            });
        }

        // Update header with calculated total
        transfer.total_amount = runningTotal;
        transfer.save();

        return transfer;
    });
}