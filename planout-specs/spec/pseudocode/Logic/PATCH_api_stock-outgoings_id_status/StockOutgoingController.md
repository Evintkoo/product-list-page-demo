FUNCTION handlePatchStatus(request, response):
    // 1. Extract parameters
    SET outgoingId = request.params.id
    SET newStatus = request.params.status
    SET currentUserId = request.user.id <!-- MISSING_FIELD: User.id -->

    // 2. Fetch existing record
    SET outgoing = DATABASE.StockOutgoing.find(outgoingId)
    IF outgoing IS NULL:
        RETURN 404 "Stock Outgoing not found"

    // 3. Validate state transition
    IF NOT isValidTransition(outgoing.status, newStatus):
        RETURN 409 "Transition from " + outgoing.status + " to " + newStatus + " is not allowed"

    // 4. Perform business logic for 'confirmed' status
    IF newStatus == "confirmed":
        SET lines = DATABASE.StockOutgoingLine.findAllBy(stock_outgoing_id: outgoingId)
        FOR EACH line IN lines:
            SET product = DATABASE.Product.find(line.product_id)
            IF product.quantity_on_hand < line.quantity:
                RETURN 422 {
                    "error": "Insufficient stock",
                    "product_name": product.name,
                    "quantity_on_hand": product.quantity_on_hand
                }

    // 5. Update record
    SET updatedOutgoing = DATABASE.StockOutgoing.update(
        id: outgoingId,
        fields: {
            status: newStatus,
            updater_id: currentUserId,
            updated_at: CURRENT_TIMESTAMP
        }
    )

    RETURN 200 updatedOutgoing

FUNCTION isValidTransition(current, next):
    SWITCH current:
        CASE "draft":
            RETURN next IN ["confirmed", "cancelled"]
        CASE "confirmed":
            RETURN next == "cancelled"
        CASE "cancelled":
            RETURN next == "draft"
        DEFAULT:
            RETURN FALSE