/**
 * Logic for updating a customer and their associated addresses.
 * Operates within a database transaction to ensure atomicity.
 */
FUNCTION updateCustomer(id, payload, companyId):
    // 1. Validate existence and ownership
    customer = READ CUSTOMER WHERE id = id AND company_id = companyId
    IF NOT customer:
        THROW 404 "Customer not found"

    // 2. Validate business rules for fields
    IF IS_BLANK(payload.name) OR IS_BLANK(payload.phone) OR IS_BLANK(payload.store) OR IS_BLANK(payload.service_tax):
        THROW 422 "Required fields cannot be blank"
    
    IF LENGTH(payload.phone) < 6:
        THROW 422 "Phone must be at least 6 characters"
        
    IF NOT IS_VALID_EMAIL(payload.email):
        THROW 422 "Invalid email format"

    IF EXISTS CUSTOMER WHERE customer_code = payload.customer_code AND id != id:
        THROW 422 "Customer code already taken"

    // 3. Transactional Update
    BEGIN TRANSACTION
        // Update Customer entity
        UPDATE CUSTOMER SET 
            name = payload.name,
            phone = payload.phone,
            email = payload.email,
            customer_code = payload.customer_code,
            store = payload.store,
            service_tax = payload.service_tax
        WHERE id = id

        // Process Addresses
        // payload.addresses is the full list of desired state
        existingAddresses = READ ADDRESS WHERE customer_id = id
        
        FOR EACH addr IN payload.addresses:
            IF addr._destroy IS TRUE:
                DELETE ADDRESS WHERE id = addr.id
            ELSE IF addr.id EXISTS:
                UPDATE ADDRESS SET street = addr.street, city = addr.city, zip_code = addr.zip_code, is_main = addr.is_main WHERE id = addr.id
            ELSE:
                INSERT INTO ADDRESS (customer_id, street, city, zip_code, is_main) VALUES (id, addr.street, addr.city, addr.zip_code, addr.is_main)

        // Validate Address Rules
        mainCount = COUNT(ADDRESS WHERE customer_id = id AND is_main = TRUE)
        IF mainCount != 1:
            ROLLBACK
            THROW 422 "Exactly one main address is required"
            
        // Ensure last remaining row cannot be removed (handled by logic check)
        IF COUNT(ADDRESS WHERE customer_id = id) == 0:
            ROLLBACK
            THROW 422 "At least one address must remain"

    COMMIT TRANSACTION
    
    RETURN READ CUSTOMER (with addresses) WHERE id = id