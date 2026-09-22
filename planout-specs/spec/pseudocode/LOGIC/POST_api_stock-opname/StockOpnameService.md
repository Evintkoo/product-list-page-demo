/**
 * Handles the creation of a Stock Opname and its associated items.
 * Ensures atomicity via database transaction.
 */
FUNCTION createStockOpname(payload, userContext):
    START TRANSACTION

    // 1. Validate request_uuid uniqueness
    IF EXISTS (SELECT 1 FROM StockOpname WHERE request_uuid = payload.request_uuid) THEN
        THROW CONFLICT_ERROR("request_uuid already processed")
    END IF

    // 2. Prepare StockOpname record
    SET newOpname = {
        id: GENERATE_UUID(),
        ref_code: GENERATE_SEQUENCE("SO-"), <!-- MISSING_FIELD: StockOpname.ref_code_generation_logic -->
        workflow_state: payload.workflow_state,
        store_id: payload.store_id,
        document_date: payload.document_date,
        completed_at: payload.completed_at,
        notes: payload.notes,
        request_uuid: payload.request_uuid,
        autofill_config: payload.autofill,
        company_id: userContext.company_id,
        creator_id: userContext.user_id,
        updater_id: userContext.user_id,
        created_at: CURRENT_TIMESTAMP,
        updated_at: CURRENT_TIMESTAMP
    }

    INSERT INTO StockOpname VALUES (newOpname)

    // 3. Process StockOpnameItems
    FOR EACH item IN payload.items:
        // Validate uniqueness of product within the same opname
        IF DUPLICATE_PRODUCT_IN_ITEMS(item.product_id) THEN
            THROW CONFLICT_ERROR("Duplicate product in items")
        END IF

        // Fetch current system state for snapshot
        SET currentSystemQty = GET_CURRENT_STOCK(item.product_id, payload.store_id)
        SET currentAvgCost = GET_AVERAGE_COST(item.product_id)

        SET newItem = {
            id: GENERATE_UUID(),
            stock_opname_id: newOpname.id,
            product_id: item.product_id,
            counted_qty: item.counted_qty,
            system_qty: currentSystemQty,
            average_cost: currentAvgCost,
            variance_qty: (item.counted_qty - currentSystemQty),
            adjustment_amount: ((item.counted_qty - currentSystemQty) * currentAvgCost),
            notes: item.notes
        }

        INSERT INTO StockOpnameItem VALUES (newItem)
    END FOR

    COMMIT TRANSACTION
    RETURN newOpname

EXCEPTION:
    ROLLBACK TRANSACTION
    RETHROW ERROR