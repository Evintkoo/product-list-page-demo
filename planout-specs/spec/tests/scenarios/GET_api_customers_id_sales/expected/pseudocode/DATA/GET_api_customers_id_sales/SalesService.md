/**
 * Orchestrates the retrieval of customer sales data.
 * Handles business logic and data validation.
 */
FUNCTION getCustomerSales(customerId):
    // 1. Verify customer exists
    customer = CustomerRepository.findCustomerById(customerId)
    IF customer IS NULL:
        THROW Error("CustomerNotFound")

    // 2. Retrieve sales list
    sales = CustomerRepository.findSalesByCustomerId(customerId)
    
    // 3. Return formatted list
    RETURN {
        "customer_id": customer.id,
        "customer_name": customer.name,
        "sales": sales
    }