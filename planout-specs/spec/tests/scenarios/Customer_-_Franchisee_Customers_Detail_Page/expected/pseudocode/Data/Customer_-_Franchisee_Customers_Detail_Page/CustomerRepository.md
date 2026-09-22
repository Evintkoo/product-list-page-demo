/**
 * Fetches a single franchisee customer record by ID.
 * Joins related entities to provide full context for the detail page.
 */
FUNCTION getCustomerById(customerId: UUID):
    QUERY "SELECT * FROM Customer WHERE id = :customerId"
    
    IF result IS EMPTY:
        THROW Error("CustomerNotFound", 404)
    
    RETURN result