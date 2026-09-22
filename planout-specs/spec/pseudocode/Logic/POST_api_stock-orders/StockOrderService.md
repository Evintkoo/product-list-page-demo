FUNCTION createStockOrder(requestData, userContext):
    // 1. Start Database Transaction
    BEGIN TRANSACTION

    // 2. Validate ref_code uniqueness
    IF EXISTS (SELECT 1 FROM StockOrder WHERE ref_code = requestData.ref_code) THEN
        THROW ConflictError("ref_code already exists")
    END IF

    // 3. Initialize StockOrder record
    SET newStockOrder = {
        id: GENERATE_UUID(),
        company_id: userContext.company_id,
        workflow_state: requestData.workflow_state,
        from_warehouse_id: requestData.from_warehouse_id,
        to_store_id: requestData.to_store_id,
        ref_code: requestData.ref_code,
        due_at: requestData.due_at,
        notes: requestData.notes,
        creator_id: userContext.user_id,
        updater_id: userContext.user_id,
        created_at: CURRENT_TIMESTAMP,
        updated_at: CURRENT_TIMESTAMP,
        order_amount: 0,    // Initialized for calculation
        receive_amount: 0   // Initialized for calculation
    }

    // 4. Process Stock Order Items
    SET totalOrderAmount = 0
    FOR EACH item IN requestData.items:
        SET itemAmount = item.order_qty * item.company_average_cost
        SET totalOrderAmount = totalOrderAmount + itemAmount

        INSERT INTO StockOrderItem (
            id,
            stock_order_id,
            product_id,
            store_qty,
            order_qty,
            company_average_cost,
            store_remark,
            order_amount,
            receive_amount,
            created_at,
            updated_at
        ) VALUES (
            GENERATE_UUID(),
            newStockOrder.id,
            item.product_id,
            item.store_qty,
            item.order_qty,
            item.company_average_cost,
            item.store_remark,
            itemAmount,
            0,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        )
    END FOR

    // 5. Finalize StockOrder
    newStockOrder.order_amount = totalOrderAmount
    INSERT INTO StockOrder VALUES (newStockOrder)

    // 6. Commit Transaction
    COMMIT TRANSACTION

    RETURN newStockOrder