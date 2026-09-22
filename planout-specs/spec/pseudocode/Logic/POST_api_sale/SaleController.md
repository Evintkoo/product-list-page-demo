FUNCTION handleCreateSale(request):
    // 1. Authentication & Authorization
    IF NOT isAuthenticated(request.headers.authorization):
        RETURN 401 Unauthorized
    
    IF NOT isAuthorizedForStore(request.body.store_id):
        RETURN 403 Forbidden

    // 2. Validation
    IF NOT isValidSchema(request.body):
        RETURN 422 Unprocessable Entity

    // 3. Transactional Persistence
    TRY:
        START TRANSACTION
        
        // Create Sale record
        newSale = INSERT INTO Sale (
            id: generateUUID(),
            store_id: request.body.store_id,
            workflow_state: "draft",
            total_amount: request.body.total_amount,
            created_at: getCurrentTimestamp()
        )

        // Create Sale Items
        FOR EACH item IN request.body.items:
            INSERT INTO SaleItem (
                id: generateUUID(),
                sale_id: newSale.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price
            )

        // Create Sale Payments
        FOR EACH payment IN request.body.payments:
            INSERT INTO SalePayment (
                id: generateUUID(),
                sale_id: newSale.id,
                payment_method: payment.payment_method,
                amount: payment.amount
            )

        COMMIT TRANSACTION
        RETURN 201 Created, newSale

    CATCH error:
        ROLLBACK TRANSACTION
        IF isConflictError(error):
            RETURN 409 Conflict
        ELSE:
            RETURN 500 Internal Server Error