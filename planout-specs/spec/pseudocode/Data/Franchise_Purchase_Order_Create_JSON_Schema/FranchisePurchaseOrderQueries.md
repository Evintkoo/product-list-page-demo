/**
 * Validates all business constraints before proceeding with insertion.
 */
async function validateFranchisePurchaseOrder(type, body, context, tx) {
  // Validate type mapping
  const stockOrderType = await tx.query(VALIDATE_TYPE_QUERY, [type]);
  if (!stockOrderType) throw new Error("Invalid order type");

  // Validate Supplier, Warehouse, Store existence and ownership
  await tx.query(VALIDATE_SUPPLIER_QUERY, [body.supplier_id, context.company_id]);
  await tx.query(VALIDATE_WAREHOUSE_QUERY, [body.from_warehouse_id, context.company_id]);
  await tx.query(VALIDATE_STORE_QUERY, [body.to_store_id, context.company_id]);

  // Validate items: duplicates, quantities, and product status
  await tx.query(VALIDATE_DUPLICATE_PRODUCTS_QUERY, [JSON.stringify(body.items)]);
  await tx.query(VALIDATE_PRODUCT_QUANTITIES_QUERY, [JSON.stringify(body.items)]);
  await tx.query(VALIDATE_PRODUCTS_QUERY, [JSON.stringify(body.items), type]);
}

/**
 * Inserts the header record.
 */
async function insertStockOrder(body, type, context, tx) {
  const refCode = generateRefCode(); // System generated
  return await tx.query(INSERT_STOCK_ORDER_QUERY, [
    refCode,
    body.supplier_ref_code,
    body.from_warehouse_id,
    body.to_store_id,
    body.supplier_id,
    type,
    'api', // document_source
    body.due_at,
    body.request_uuid,
    body.notes,
    context.company_id,
    context.user_id
  ]);
}

/**
 * Inserts items and captures snapshots of current stock/price.
 */
async function insertStockOrderItems(stockOrderId, items, body, tx) {
  return await tx.query(INSERT_STOCK_ORDER_ITEMS_QUERY, [
    stockOrderId,
    JSON.stringify(items),
    body.to_store_id,
    body.from_warehouse_id
  ]);
}

/**
 * Finalizes the header total based on inserted items.
 */
async function updateStockOrderTotal(stockOrderId, tx) {
  return await tx.query(UPDATE_STOCK_ORDER_TOTAL_QUERY, [stockOrderId]);
}

/**
 * Records the initial 'draft' state.
 */
async function insertWorkflowHistory(stockOrderId, userId, tx) {
  return await tx.query(INSERT_WORKFLOW_HISTORY_QUERY, [stockOrderId, userId]);
}

/**
 * Fetches the final response object.
 */
async function getFranchisePurchaseOrderResponse(stockOrderId, tx) {
  return await tx.query(GET_RESPONSE_QUERY, [stockOrderId]);
}