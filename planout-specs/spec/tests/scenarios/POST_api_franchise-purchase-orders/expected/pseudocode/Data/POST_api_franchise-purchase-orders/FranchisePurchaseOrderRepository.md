/**
 * Persists a new franchise purchase order record to the database.
 * 
 * @param orderData - The validated purchase order object containing 
 * from_warehouse_id, to_store_id, and supplier_id.
 * @returns The newly created FranchisePurchaseOrder record.
 */
function createFranchisePurchaseOrder(orderData) {
    const newOrder = {
        id: generateUUID(),
        from_warehouse_id: orderData.from_warehouse_id,
        to_store_id: orderData.to_store_id,
        supplier_id: orderData.supplier_id,
        status: 'PENDING',
        created_at: getCurrentTimestamp(),
        created_by: getAuthenticatedUserId()
    };

    // Insert into the FranchisePurchaseOrder table
    db.table('FranchisePurchaseOrder').insert(newOrder);

    return newOrder;
}

/**
 * Validates existence of related entities before order creation.
 * Ensures that the warehouse, store, and supplier IDs are valid.
 */
function validateOrderReferences(from_warehouse_id, to_store_id, supplier_id) {
    const warehouseExists = db.table('Warehouse').exists({ id: from_warehouse_id });
    const storeExists = db.table('Store').exists({ id: to_store_id });
    const supplierExists = db.table('Supplier').exists({ id: supplier_id });

    if (!warehouseExists || !storeExists || !supplierExists) {
        throw new Error("INVALID_REFERENCE_IDS");
    }
}