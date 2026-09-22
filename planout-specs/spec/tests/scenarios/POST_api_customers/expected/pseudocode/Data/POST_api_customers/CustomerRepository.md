/**
 * Executes the creation of a customer and their associated addresses 
 * within a single atomic database transaction.
 */
FUNCTION createCustomerWithAddresses(customerData, addressList, authenticatedUserId):
    BEGIN TRANSACTION
        // 1. Create the base customer record
        SET newCustomer = INSERT INTO Customer (
            id, 
            name, 
            is_wholesale, 
            is_franchise, 
            is_consignment, 
            creator_id, 
            updater_id, 
            created_at
        ) VALUES (
            GENERATE_UUID(),
            customerData.name,
            customerData.type == 'wholesale',
            customerData.type == 'franchise',
            customerData.type == 'consignment',
            authenticatedUserId,
            authenticatedUserId,
            CURRENT_TIMESTAMP
        ) RETURNING *

        // 2. Process and insert addresses
        FOR EACH address IN addressList:
            SET newAddress = INSERT INTO CustomerAddress (
                id,
                customer_id,
                address_line,
                city,
                is_main_address
            ) VALUES (
                GENERATE_UUID(),
                newCustomer.id,
                address.address_line,
                address.city,
                address.is_main_address
            ) RETURNING *

            // 3. If this is the main address, update the customer's primary reference
            IF address.is_main_address IS TRUE:
                UPDATE Customer 
                SET primary_address_id = newAddress.id 
                WHERE id = newCustomer.id
            END IF
        END FOR

        COMMIT TRANSACTION
        RETURN newCustomer (with associated addresses)

    ON EXCEPTION:
        ROLLBACK TRANSACTION
        THROW DatabaseError("Failed to persist customer data")
    END TRANSACTION