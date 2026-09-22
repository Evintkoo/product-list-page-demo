/**
 * Handles the creation of a franchise purchase return.
 */
FUNCTION createFranchisePurchaseReturn(request):
    // 1. Validate Authentication and Authorization
    IF NOT user.isAuthenticated():
        RETURN 401 Unauthorized
    IF NOT user.hasPermission("CREATE_FRANCHISE_RETURN"):
        RETURN 403 Forbidden

    // 2. Validate Request Payload
    IF request.body is missing required fields (return_from, return_to_supplier, franchise_purchase_order, items):
        RETURN 400 Bad Request

    // 3. Verify Franchise Purchase Order existence
    SET purchaseOrder = DB.find(FRANCHISE_PURCHASE_ORDER, request.body.franchise_purchase_order)
    IF purchaseOrder IS NULL:
        RETURN 404 Not Found

    // 4. Check for existing return for this order (Conflict check)
    SET existingReturn = DB.find(STOCK_RETURN, { franchise_purchase_order: request.body.franchise_purchase_order })
    IF existingReturn IS NOT NULL:
        RETURN 409 Conflict

    // 5. Validate items and quantities
    FOR EACH item IN request.body.items:
        // Validate return_qty against max_return_qty
        IF item.return_qty > item.max_return_qty: <!-- MISSING_FIELD: STOCK_RETURN_ITEM.max_return_qty -->
            RETURN 400 Bad Request ("Return quantity exceeds allowed limit")

    // 6. Persist Data
    START TRANSACTION
        SET newReturn = DB.create(STOCK_RETURN, {
            id: GENERATE_UUID(),
            type: "franchise_external",
            return_from: request.body.return_from,
            return_to_supplier: request.body.return_to_supplier,
            franchise_purchase_order: request.body.franchise_purchase_order,
            document_no: request.body.document_no,
            reference_no: request.body.reference_no,
            notes: request.body.notes,
            created_at: CURRENT_TIMESTAMP
        })

        FOR EACH item IN request.body.items:
            DB.create(STOCK_RETURN_ITEM, {
                id: GENERATE_UUID(),
                stock_return_id: newReturn.id,
                product_id: item.product_id,
                return_qty: item.return_qty,
                reason: item.reason
            })
    COMMIT TRANSACTION

    RETURN 201 Created (newReturn)

CATCH Exception:
    ROLLBACK TRANSACTION
    RETURN 500 Internal Server Error