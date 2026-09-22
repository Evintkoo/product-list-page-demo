/**
 * Handles persistence for Sales Order creation.
 * The logic ensures atomicity: the SalesOrder header and its associated 
 * SalesOrderItems must be created within a single database transaction.
 */

FUNCTION createSalesOrder(orderData):
    BEGIN TRANSACTION
        // 1. Generate unique document number (e.g., SO-YYYYMMDD-XXXX)
        SET docNumber = GENERATE_DOCUMENT_NUMBER("SO")
        
        // 2. Insert Header
        SET newOrder = INSERT INTO SalesOrder (
            customer_id, 
            customer_ref_code, 
            warehouse_id, 
            due_at, 
            delivery_address, 
            notes, 
            document_number,
            status
        ) VALUES (
            orderData.customer_id,
            orderData.customer_ref_code,
            orderData.warehouse_id,
            orderData.due_at,
            orderData.delivery_address,
            orderData.notes,
            docNumber,
            "DRAFT"
        )

        // 3. Insert Items
        FOR EACH item IN orderData.items:
            INSERT INTO SalesOrderItem (
                sales_order_id,
                product_id,
                quantity,
                unit_price,
                discount_type,
                discount_rate,
                unit_discount_amount,
                discount_including_tax
            ) VALUES (
                newOrder.id,
                item.product_id,
                item.quantity,
                item.unit_price,
                item.discount_type,
                item.discount_rate,
                item.unit_discount_amount,
                item.discount_including_tax
            )
        END FOR

        // 4. Trigger Inventory Reservation (Logic layer handles stock validation)
        CALL ReserveStock(newOrder.id)

    COMMIT TRANSACTION
    RETURN newOrder.id