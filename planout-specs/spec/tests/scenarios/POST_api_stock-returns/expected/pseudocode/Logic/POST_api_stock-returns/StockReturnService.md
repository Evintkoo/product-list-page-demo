/**
 * Logic for persisting StockReturn entities
 */
async function create(data) {
    // Generate unique ID for the new record
    const id = UUID.generate();
    
    const record = {
        id: id,
        from_store_id: data.from_store_id,
        to_warehouse_id: data.to_warehouse_id,
        internal_supplier_id: data.internal_supplier_id,
        status: data.status,
        created_at: data.created_at,
        created_by: data.created_by
    };

    // Persist to database
    await Database.insert("StockReturn", record);

    return record;
}