FUNCTION handleCreateDiscrepancyStock(request):
    // 1. Idempotency Check
    IF request.body.request_uuid EXISTS:
        existingReport = READ DISCREPANCY_STOCK WHERE request_uuid = request.body.request_uuid
        IF existingReport EXISTS:
            RETURN 200 OK with existingReport (including lines)

    // 2. Validation
    // Validate entity_id belongs to current user's company
    store = READ STORE WHERE id = request.body.entity_id AND company_id = session.company_id
    IF NOT store:
        RETURN 422 Unprocessable Entity ("Invalid store for company")

    // Validate lines
    IF request.body.lines IS EMPTY:
        RETURN 422 Unprocessable Entity ("At least one item required")
    
    // Check for duplicate products and invalid quantities
    seenProductIds = []
    FOR EACH line IN request.body.lines:
        IF line.quantity <= 0:
            RETURN 422 Unprocessable Entity ("Quantity must be > 0")
        IF line.product_id IN seenProductIds:
            RETURN 422 Unprocessable Entity ("Duplicate product in lines")
        
        product = READ PRODUCT WHERE id = line.product_id
        IF NOT product:
            RETURN 422 Unprocessable Entity ("Unknown product_id")
        
        APPEND line.product_id TO seenProductIds

    // 3. Persistence (Atomic Transaction)
    START TRANSACTION:
        // Generate ref_code: DISC/{store_code}/{sequence}
        newRefCode = GenerateRefCode(store.code)
        
        newReport = CREATE DISCREPANCY_STOCK:
            id = GENERATE_UUID()
            company_id = session.company_id
            entity_id = request.body.entity_id
            entity_type = "store"
            ref_code = newRefCode
            state = "draft"
            creator_id = session.user_id
            request_uuid = request.body.request_uuid
            created_at = CURRENT_TIMESTAMP()

        FOR EACH line IN request.body.lines:
            CREATE DISCREPANCY_STOCK_LINE:
                id = GENERATE_UUID()
                discrepancy_stock_id = newReport.id
                product_id = line.product_id
                quantity = line.quantity

    COMMIT TRANSACTION

    RETURN 201 Created with newReport (including lines)