/**
 * Handles atomic persistence for Purchase Returns.
 * Uses a database transaction to ensure header and items are created together.
 */
function createPurchaseReturnTransaction(headerData, itemsData) {
  return database.transaction(async (tx) => {
    // 1. Create the header record
    const header = await tx.insert("CompanyPurchaseReturn", {
      id: generateUuid(),
      ref_code: generateRefCode(),
      return_type: headerData.return_type,
      request_uuid: headerData.request_uuid,
      created_at: now(),
      updated_at: now()
    });

    // 2. Create associated items
    if (itemsData && itemsData.length > 0) {
      for (const item of itemsData) {
        await tx.insert("CompanyPurchaseReturnItem", {
          id: generateUuid(),
          company_purchase_return_id: header.id,
          product_id: item.product_id,
          quantity: item.quantity
        });
      }
    }

    return header;
  });
}

/**
 * Checks for existing request_uuid to ensure idempotency.
 */
function findByRequestUuid(requestUuid) {
  return database.select("CompanyPurchaseReturn")
    .where("request_uuid", "=", requestUuid)
    .first();
}