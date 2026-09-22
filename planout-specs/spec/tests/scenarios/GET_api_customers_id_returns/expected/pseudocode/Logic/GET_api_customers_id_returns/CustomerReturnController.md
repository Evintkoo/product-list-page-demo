FUNCTION handleGetCustomerReturns(request, response):
    // 1. Validate path parameter
    SET customerId = request.params.id
    IF NOT isValidUuid(customerId) THEN
        RETURN response.status(400).json({ error: "Malformed customer_id" })
    END IF

    // 2. Fetch Customer and verify Retail status
    SET customer = Database.find("Customer", { id: customerId })
    
    IF customer IS NULL THEN
        RETURN response.status(404).json({ error: "Customer not found" })
    END IF

    // Business Rule: Must be a Retail Customer
    IF customer.is_wholesale IS TRUE OR 
       customer.is_franchise IS TRUE OR 
       customer.is_consignment IS TRUE THEN
        RETURN response.status(404).json({ error: "Customer is not a retail customer" })
    END IF

    // 3. Retrieve Return Records
    // Using Customer Return List Query
    SET returns = Database.findAll("ReturnRecord", { customer_id: customerId })

    // 4. Return success response
    RETURN response.status(200).json(returns)

CATCH Exception:
    RETURN response.status(500).json({ error: "Internal server error" })