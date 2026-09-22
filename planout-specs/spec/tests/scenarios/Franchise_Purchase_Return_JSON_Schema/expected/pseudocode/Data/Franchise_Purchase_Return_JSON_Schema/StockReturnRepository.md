/**
 * Coordinates the creation of a Franchise Purchase Return.
 * All operations are wrapped in a single database transaction.
 */
async function createStockReturn(requestData, authContext) {
  return await db.transaction(async (tx) => {
    // 1. Validate business rules and snapshot data
    await validateReturnRequest(tx, requestData, authContext);

    // 2. Insert Header
    const header = await insertStockReturnHeader(tx, requestData, authContext);

    // 3. Insert Items
    await insertStockReturnItems(tx, header.stock_return_id, requestData.items, requestData.sender_location_id);

    // 4. Fetch full document for response
    return await getStockReturnById(tx, header.stock_return_id);
  });
}

/**
 * Validates that the return is allowed based on current system state.
 * Re-computes caps and stock levels to prevent race conditions.
 */
async function validateReturnRequest(tx, data, auth) {
  // Verify source order ownership and location matching
  const order = await tx.query(
    "SELECT * FROM franchise_purchase_orders WHERE franchise_purchase_order_id = $1 AND company_id = $2 AND store_id = $3 AND supplier_id = $4",
    [data.source_order_id, auth.company_id, data.sender_location_id, data.receiver_location_id]
  );
  if (!order) throw new Error("Invalid source order or location mismatch");

  // Validate lines against order items and current return caps
  const lines = await tx.query(
    `SELECT li.franchise_purchase_order_item_id, li.received_quantity, 
            (li.received_quantity - COALESCE(prior.returned_quantity, 0)) as max_return
     FROM franchise_purchase_order_items li
     LEFT JOIN (SELECT SUM(quantity) as returned_quantity, source_order_line_id FROM stock_return_items ... GROUP BY source_order_line_id) prior ...
     WHERE li.franchise_purchase_order_id = $1`,
    [data.source_order_id]
  );
  
  // Perform logic checks:
  // - Ensure quantity > 0
  // - Ensure quantity <= max_return
  // - Ensure store has sufficient stock (via store_stocks join)
}

/**
 * Inserts the header record.
 */
async function insertStockReturnHeader(tx, data, auth) {
  const refCode = generateRefCode(data.sender_location_id);
  return await tx.one(
    `INSERT INTO stock_returns (ref_code, supplier_ref_code, company_id, type, workflow_state, 
                               source_order_id, source_order_type, sender_location_id, 
                               receiver_location_id, receiver_location_type, creator_id, updater_id)
     VALUES ($1, $2, $3, $4, 'draft', $5, 'franchise_purchase_order', $6, $7, 'supplier', $8, $8)
     RETURNING stock_return_id`,
    [refCode, data.supplier_ref_code, auth.company_id, data.type, data.source_order_id, data.sender_location_id, data.receiver_location_id, auth.user_id]
  );
}

/**
 * Inserts line items using the validated snapshot data.
 */
async function insertStockReturnItems(tx, stockReturnId, items, storeId) {
  // Uses UNNEST and JSONB_TO_RECORD to perform bulk insert
  // Joins against franchise_purchase_order_items and store_stocks to resolve snapshots
  await tx.query(
    `INSERT INTO stock_return_items (stock_return_id, product_id, store_quantity, order_quantity, 
                                     prior_returned_quantity, max_return_quantity, quantity, 
                                     supply_price, reason, source_order_line_id)
     SELECT $1, ... FROM UNNEST($2) ...`,
    [stockReturnId, items, storeId]
  );
}

/**
 * Fetches the complete document with joined product details for the UI.
 */
async function getStockReturnById(tx, stockReturnId) {
  return await tx.one(
    `SELECT sr.*, COALESCE(jsonb_agg(jsonb_build_object(...)), '[]') as items
     FROM stock_returns sr
     LEFT JOIN stock_return_items sri ON ...
     LEFT JOIN products p ON ...
     WHERE sr.stock_return_id = $1
     GROUP BY sr.stock_return_id`,
    [stockReturnId]
  );
}