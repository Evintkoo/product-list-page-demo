/**
 * Fetches a customer by ID to verify existence.
 * @param {string} id - The customer_id from the path parameter.
 */
FUNCTION findCustomerById(id):
    RETURN DB.query("SELECT * FROM Customer WHERE id = ?", [id])

/**
 * Fetches all sales records associated with a specific customer.
 * @param {string} customerId - The ID of the customer.
 */
FUNCTION findSalesByCustomerId(customerId):
    RETURN DB.query("SELECT id, item_name, amount, purchased_at FROM Sale WHERE customer_id = ? ORDER BY purchased_at DESC", [customerId])