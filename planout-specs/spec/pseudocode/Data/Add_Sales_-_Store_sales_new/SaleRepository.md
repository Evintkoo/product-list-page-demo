/**
 * Handles persistence logic for the /api/sale endpoint.
 * Validates required fields before database transaction.
 */
FUNCTION createSale(payload):
    // 1. Validation: Ensure mandatory fields are present
    IF payload.customer_id IS EMPTY OR payload.salesperson_id IS EMPTY OR payload.register_id IS EMPTY:
        THROW Error("Missing required fields: customer, salesperson, or register.")

    // 2. Transactional persistence
    START TRANSACTION
        // Create the parent Sale record
        newSale = INSERT INTO Sale (
            id, 
            customer_id, 
            salesperson_id, 
            register_id, 
            total_amount, 
            created_at
        ) VALUES (
            GENERATE_UUID(), 
            payload.customer_id, 
            payload.salesperson_id, 
            payload.register_id, 
            payload.total_amount, 
            CURRENT_TIMESTAMP
        )

        // Create associated SaleItems
        FOR EACH item IN payload.items:
            INSERT INTO SaleItem (
                id, 
                sale_id, 
                product_id, 
                quantity, 
                unit_price
            ) VALUES (
                GENERATE_UUID(), 
                newSale.id, 
                item.product_id, 
                item.quantity, 
                item.unit_price
            )
    COMMIT TRANSACTION

    RETURN newSale.id