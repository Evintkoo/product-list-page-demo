/**
 * Handles persistence for Customer and associated Address entities.
 */
FUNCTION createRetailCustomer(customerData: CustomerCreateRequest):
    // 1. Start Database Transaction
    BEGIN TRANSACTION

    // 2. Insert Customer record
    SET newCustomer = INSERT INTO Customer (
        id, name, type, email, created_at
    ) VALUES (
        UUID(), customerData.name, "retail", customerData.email, NOW()
    )

    // 3. Insert associated Addresses
    FOR EACH addressItem IN customerData.addresses:
        INSERT INTO Address (
            id, customer_id, address_type, address, phone_1, phone_2, 
            fax, is_main_address, is_shipping_address
        ) VALUES (
            UUID(), newCustomer.id, addressItem.address_type, addressItem.address, 
            addressItem.phone_1, addressItem.phone_2, addressItem.fax, 
            addressItem.is_main_address, addressItem.is_shipping_address
        )
    END FOR

    // 4. Commit Transaction
    COMMIT TRANSACTION

    RETURN newCustomer
END FUNCTION