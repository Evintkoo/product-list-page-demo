/**
 * Approves a Stock Outgoing document.
 * Logic must be executed within a single database transaction.
 */
function approveStockOutgoing(id: UUID, requestBody: ApproveRequest): StockOutgoingDetail {
  return transaction(async () => {
    // 1. Fetch and Validate
    const document = await db.StockOutgoing.findUnique({ where: { id } });
    if (!document) throw new NotFoundError();
    if (document.status !== 'CONFIRMED') throw new ConflictError('Document must be confirmed');
    if (document.approved_at) throw new ConflictError('Document already approved');

    const lines = await db.StockOutgoingLine.findMany({ where: { stock_outgoing_id: id } });

    // 2. Process Lines and Validate Stock
    for (const line of lines) {
      if (!line.coa_reversal_id) {
        throw new UnprocessableEntityError('Missing reversal account for line');
      }
      
      // Verify stock availability
      if (!checkStockAvailability(line.product_id, line.order_amount)) {
        throw new UnprocessableEntityError('Insufficient stock for line');
      }

      // Update line with current cost/amount
      await db.StockOutgoingLine.update({
        where: { id: line.id },
        data: {
          average_cost: getCurrentCost(line.product_id),
          order_amount: line.order_amount,
          coa_reversal_id: line.coa_reversal_id
        }
      });
    }

    // 3. Create Journal
    const journal = await db.Journal.create({ data: { created_at: now() } });
    
    for (const line of lines) {
      const amount = line.average_cost * line.order_amount;
      
      // Debit the line's COA
      await db.JournalEntry.create({
        data: { journal_id: journal.id, account_code: line.coa_id, debit: amount, credit: 0 }
      });
      
      // Credit the fixed income account
      await db.JournalEntry.create({
        data: { journal_id: journal.id, account_code: '100.105.001', debit: 0, credit: amount }
      });
    }

    // 4. Finalize Document
    const updatedDoc = await db.StockOutgoing.update({
      where: { id },
      data: {
        notes: requestBody.notes,
        approved_at: now(),
        journal_id: journal.id,
        status: 'APPROVED'
      }
    });

    // 5. Trigger Stock Movement
    performStockOutgoing(id);

    return formatResponse(updatedDoc);
  });
}