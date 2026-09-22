/**
 * Logic for approving a Stock Outgoing document.
 * Ensures atomicity across inventory deduction and journal posting.
 */
async function approveStockOutgoing(id, payload) {
    // 1. Fetch the StockOutgoing document
    const outgoing = await db.StockOutgoing.findById(id);
    if (!outgoing) throw new Error("404: Not Found");
    
    // 2. Validate state
    if (outgoing.status !== 'confirmed') {
        throw new Error("409: Document must be in 'confirmed' status to be approved");
    }
    if (outgoing.approved_at !== null) {
        throw new Error("409: Document is already approved");
    }

    const lines = await db.StockOutgoingLine.findAll({ where: { stock_outgoing_id: id } });

    // 3. Start Transaction
    return await db.transaction(async (tx) => {
        let totalJournalAmount = 0;
        const journal = await db.Journal.create({ created_at: new Date() }, { transaction: tx });

        for (const line of lines) {
            const inputLine = payload.lines.find(l => l.id === line.id);
            
            // Validate reversal account presence
            if (!inputLine || !inputLine.coa_reversal_id) {
                throw new Error("422: Missing reversal account for line");
            }

            // Update line details
            const currentCost = await inventoryService.getCurrentCost(line.product_id); <!-- MISSING_FIELD: StockOutgoingLine.product_id -->
            await line.update({
                average_cost: currentCost,
                coa_reversal_id: inputLine.coa_reversal_id
            }, { transaction: tx });

            // Deduct stock
            const hasStock = await inventoryService.deductStock(line.product_id, line.order_amount); <!-- MISSING_FIELD: StockOutgoingLine.product_id -->
            if (!hasStock) throw new Error("422: Insufficient stock for line");

            // Create Journal Entry (Debit)
            await db.JournalEntry.create({
                journal_id: journal.id,
                account_code: line.coa_id,
                debit: line.order_amount * line.average_cost,
                credit: 0
            }, { transaction: tx });

            totalJournalAmount += (line.order_amount * line.average_cost);
        }

        // Create Journal Entry (Credit to 100.105.001)
        await db.JournalEntry.create({
            journal_id: journal.id,
            account_code: "100.105.001",
            debit: 0,
            credit: totalJournalAmount
        }, { transaction: tx });

        // 4. Finalize Document
        await outgoing.update({
            status: 'approved',
            approved_at: new Date(),
            journal_id: journal.id,
            notes: payload.notes
        }, { transaction: tx });

        return outgoing;
    });
}