/**
 * Handles the creation of a new Company Purchase Return.
 * Orchestrates the transaction to ensure atomicity between the header and items.
 */
FUNCTION handleCreatePurchaseReturn(request):
    // 1. Validate request body structure
    IF request.body is malformed:
        RETURN 400 "Malformed request body"

    // 2. Check for idempotency using request_uuid
    existingReturn = READ CompanyPurchaseReturn WHERE request_uuid = request.body.request_uuid
    IF existingReturn EXISTS:
        RETURN 201 existingReturn

    // 3. Begin Database Transaction
    START TRANSACTION

    TRY:
        // 4. Prepare Header Data
        newHeader = {
            id: GENERATE_UUID(),
            ref_code: GENERATE_REF_CODE(), <!-- MISSING_FIELD: CompanyPurchaseReturn.ref_code_generation_logic -->
            return_type: request.body.return_type,
            request_uuid: request.body.request_uuid,
            created_at: CURRENT_TIMESTAMP,
            updated_at: CURRENT_TIMESTAMP
        }

        // 5. Persist Header
        INSERT INTO CompanyPurchaseReturn (newHeader)

        // 6. Process Items
        FOR EACH item IN request.body.items:
            newItem = {
                id: GENERATE_UUID(),
                company_purchase_return_id: newHeader.id,
                product_id: item.product_id,
                quantity: item.quantity
            }
            
            // Validate product existence
            IF NOT EXISTS (SELECT 1 FROM Product WHERE id = item.product_id): <!-- MISSING_FIELD: Product.id -->
                ROLLBACK
                RETURN 404 "Product not found"

            INSERT INTO CompanyPurchaseReturnItem (newItem)

        // 7. Commit Transaction
        COMMIT
        RETURN 201 newHeader

    CATCH error:
        ROLLBACK
        IF error is validation_error:
            RETURN 422 error.details
        ELSE:
            RETURN 500 "Internal Server Error"