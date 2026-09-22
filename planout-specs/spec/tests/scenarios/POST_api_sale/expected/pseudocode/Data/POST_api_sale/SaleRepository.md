/**
 * Handles atomic persistence for the Sale aggregate.
 * Uses a database transaction to ensure Sale, SaleItems, and SalePayments 
 * are committed together.
 */
FUNCTION createSaleTransaction(saleData, itemsData, paymentsData):
    BEGIN TRANSACTION
        // 1. Insert the primary Sale record
        SET newSale = INSERT INTO Sale (
            id, 
            store_id, 
            workflow_state, 
            total_amount, 
            created_at
        ) VALUES (
            GENERATE_UUID(), 
            saleData.store_id, 
            'draft', 
            saleData.total_amount, 
            CURRENT_TIMESTAMP
        )

        // 2. Insert associated line items
        FOR EACH item IN itemsData:
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

        // 3. Insert associated payments
        FOR EACH payment IN paymentsData:
            INSERT INTO SalePayment (
                id, 
                sale_id, 
                payment_method, 
                amount
            ) VALUES (
                GENERATE_UUID(), 
                newSale.id, 
                payment.payment_method, 
                payment.amount
            )

        COMMIT TRANSACTION
        RETURN newSale

    CATCH ERROR:
        ROLLBACK TRANSACTION
        THROW DATABASE_EXCEPTION