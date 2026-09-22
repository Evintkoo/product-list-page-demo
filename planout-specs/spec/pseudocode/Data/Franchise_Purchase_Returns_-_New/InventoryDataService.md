/**
 * Fetches the list of available stores for the "Return From" dropdown.
 * Endpoint: GET /api/stores
 */
function getStores(): Promise<Store[]> {
  return db.select().from(Store);
}

/**
 * Fetches the list of internal suppliers for the "Return To Supplier" dropdown.
 * Endpoint: GET /api/suppliers?is_internal=true
 */
function getInternalSuppliers(): Promise<Supplier[]> {
  return db.select().from(Supplier).where(Supplier.is_internal == true);
}

/**
 * Persists the new Franchise Purchase Return.
 * Maps the incoming payload to the PurchaseReturn and PurchaseReturnItem entities.
 */
async function createPurchaseReturn(payload: {
  ref_code: string,
  type: string,
  workflow_state: string,
  supplier_id: string,
  store_id: string,
  notes: string,
  product_id: string,
  purchase_order_id: string
}): Promise<void> {
  
  // Start transaction to ensure atomicity between header and items
  await db.transaction(async (tx) => {
    const returnId = generateUuid();

    // Insert Header
    await tx.insert(PurchaseReturn).values({
      id: returnId,
      ref_code: payload.ref_code,
      type: payload.type,
      workflow_state: payload.workflow_state,
      sender_location_id: payload.store_id,
      receiver_location_id: payload.supplier_id,
      receiver_location_type: 'supplier',
      notes: payload.notes,
      purchase_order_id: payload.purchase_order_id
    });

    // Insert Line Items
    await tx.insert(PurchaseReturnItem).values({
      id: generateUuid(),
      purchase_return_id: returnId,
      product_id: payload.product_id
    });
  });
}