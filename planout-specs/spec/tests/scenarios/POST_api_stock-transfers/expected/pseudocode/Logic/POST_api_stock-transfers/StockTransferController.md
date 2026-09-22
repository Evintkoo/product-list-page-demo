FUNCTION handleCreateStockTransfer(request):
    // 1. Idempotency Check
    existingTransfer = READ StockTransfer WHERE request_uuid = request.body.request_uuid
    IF existingTransfer EXISTS:
        RETURN 201, existingTransfer

    // 2. Validation
    IF request.body.from_location_id == request.body.to_location_id:
        RETURN 422, "Source and destination locations must be different"
    
    IF request.body.lines IS EMPTY OR ANY line.transfered_qty <= 0:
        RETURN 422, "Invalid line items provided"

    // 3. Transactional Processing
    START TRANSACTION
        // Generate Header
        newTransfer = CREATE StockTransfer:
            id = GENERATE_UUID()
            company_id = AUTH_USER.company_id
            from_location_id = request.body.from_location_id
            to_location_id = request.body.to_location_id
            ref_code = request.body.ref_code OR GENERATE_REF_CODE()
            workflow_state = "draft"
            created_at = NOW()
            request_uuid = request.body.request_uuid
            total_amount = 0 // Initialized for calculation

        runningTotal = 0

        // Process Lines
        FOR EACH item IN request.body.lines:
            // Fetch snapshots from current inventory state
            sourceSnapshot = GET_CURRENT_STOCK(item.product_id, newTransfer.from_location_id) <!-- MISSING_FIELD: Inventory.qty -->
            destSnapshot = GET_CURRENT_STOCK(item.product_id, newTransfer.to_location_id) <!-- MISSING_FIELD: Inventory.qty -->
            avgCost = GET_AVERAGE_COST(item.product_id) <!-- MISSING_FIELD: Product.average_cost -->
            
            lineAmount = item.transfered_qty * avgCost
            runningTotal += lineAmount

            CREATE StockTransferLine:
                id = GENERATE_UUID()
                stock_transfer_id = newTransfer.id
                product_id = item.product_id
                transfered_qty = item.transfered_qty
                source_qty_snapshot = sourceSnapshot
                dest_qty_snapshot = destSnapshot
                sender_average_cost = avgCost
                line_amount = lineAmount

        // Update Header Total
        UPDATE StockTransfer SET total_amount = runningTotal WHERE id = newTransfer.id
    COMMIT TRANSACTION

    RETURN 201, newTransfer