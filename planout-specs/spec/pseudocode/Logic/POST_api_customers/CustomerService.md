FUNCTION createCustomer(requestBody, authenticatedUser):
    // 1. Start Database Transaction
    BEGIN TRANSACTION

    // 2. Prepare Customer Record
    SET customerData = {
        id: GENERATE_UUID(),
        name: requestBody.name,
        is_wholesale: requestBody.type == 'wholesale',
        is_franchise: requestBody.type == 'franchise',
        is_consignment: requestBody.type == 'consignment',
        creator_id: authenticatedUser.id,
        updater_id: authenticatedUser.id,
        created_at: CURRENT_TIMESTAMP,
        updated_at: CURRENT_TIMESTAMP
    }

    // 3. Persist Customer
    INSERT INTO Customer (id, name, is_wholesale, is_franchise, is_consignment, creator_id, updater_id, created_at, updated_at)
    VALUES (customerData.id, customerData.name, customerData.is_wholesale, customerData.is_franchise, customerData.is_consignment, customerData.creator_id, customerData.updater_id, customerData.created_at, customerData.updated_at)

    // 4. Process Addresses
    IF requestBody.addresses IS NOT EMPTY:
        FOR EACH address IN requestBody.addresses:
            SET addressId = GENERATE_UUID()
            
            INSERT INTO CustomerAddress (id, customer_id, address_line, city, is_main_address)
            VALUES (addressId, customerData.id, address.address_line, address.city, address.is_main_address)

            // If this is the main address, update the Customer record
            IF address.is_main_address IS TRUE:
                UPDATE Customer 
                SET primary_address_id = addressId 
                WHERE id = customerData.id
                SET customerData.primary_address_id = addressId

    // 5. Commit Transaction
    COMMIT TRANSACTION

    RETURN customerData