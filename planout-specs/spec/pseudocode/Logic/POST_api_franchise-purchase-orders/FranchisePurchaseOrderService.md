FUNCTION createOrder(data):
    // 1. Prepare record
    record = {
        id: generateUUID(),
        from_warehouse_id: data.from_warehouse_id,
        to_store_id: data.to_store_id,
        supplier_id: data.supplier_id,
        status: "PENDING", <!-- MISSING_FIELD: FranchisePurchaseOrder.status_default_value -->
        created_at: getCurrentTimestamp(),
        created_by: data.created_by
    }

    // 2. Persist to Database
    INSERT INTO FranchisePurchaseOrder (
        id, 
        from_warehouse_id, 
        to_store_id, 
        supplier_id, 
        status, 
        created_at, 
        created_by
    ) VALUES (
        record.id, 
        record.from_warehouse_id, 
        record.to_store_id, 
        record.supplier_id, 
        record.status, 
        record.created_at, 
        record.created_by
    )

    RETURN record