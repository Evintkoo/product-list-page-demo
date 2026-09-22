/**
 * Data access layer for Customer entities.
 * Handles filtering logic to ensure only franchise-type customers are retrieved.
 */

FUNCTION getFranchiseCustomers():
    // Query the Customer table
    // Filter: is_franchise must be TRUE
    // Return the list of matching records
    RETURN Database.query(
        "SELECT id, name, email, is_franchise, created_at 
         FROM Customer 
         WHERE is_franchise = TRUE"
    )

/**
 * Helper to validate if a specific customer exists and belongs to a franchise
 * Used by the service layer for authorization checks (403 handling)
 */
FUNCTION getCustomerById(customerId):
    RETURN Database.query(
        "SELECT * FROM Customer WHERE id = ?", 
        [customerId]
    )