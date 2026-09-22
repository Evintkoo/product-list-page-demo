/**
 * Fetches the detailed address information for a specific customer.
 * Endpoint: GET /api/customers/:id
 */
FUNCTION getCustomerAddressDetail(customerId: UUID):
    // Query the database for the CustomerAddress record associated with the customerId
    DATA = DB.CustomerAddress.findFirst({ where: { customer_id: customerId } })
    
    IF DATA is null:
        THROW Error("Address details not found for this customer")
    
    RETURN DATA