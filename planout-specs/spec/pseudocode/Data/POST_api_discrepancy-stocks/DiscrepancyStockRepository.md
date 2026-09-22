/**
 * Handles persistence for Discrepancy Stock reports.
 * Uses a transaction to ensure atomicity between header and lines.
 */
function createDiscrepancyStock(data, { companyId, creatorId }) {
  return database.transaction(async (tx) => {
    // 1. Check for existing report by request_uuid (Idempotency)
    const existing = await tx.find('DISCREPANCY_STOCK', { request_uuid: data.request_uuid });
    if (existing) return existing;

    // 2. Generate ref_code: DISC/{store_code}/{sequence}
    const store = await tx.find('STORE', { id: data.entity_id });
    const sequence = await tx.getNextSequence('DISCREPANCY_STOCK', store.code);
    const refCode = `DISC/${store.code}/${sequence}`;

    // 3. Create Header
    const report = await tx.insert('DISCREPANCY_STOCK', {
      id: generateUuid(),
      company_id: companyId,
      entity_id: data.entity_id,
      entity_type: 'store',
      ref_code: refCode,
      state: 'draft',
      creator_id: creatorId,
      request_uuid: data.request_uuid,
      created_at: now()
    });

    // 4. Create Lines
    for (const line of data.items) {
      await tx.insert('DISCREPANCY_STOCK_LINE', {
        id: generateUuid(),
        discrepancy_stock_id: report.id,
        product_id: line.product_id,
        quantity: line.quantity
      });
    }

    return { ...report, items: data.items };
  });
}