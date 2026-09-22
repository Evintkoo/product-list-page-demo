/**
 * Fetches a single Stock Order header by ID.
 * Enforces multi-tenancy by requiring the company_id from the authenticated session.
 */
FUNCTION getStockOrderById(orderId: UUID, companyId: UUID):
    // Query the database for the specific order belonging to the user's company
    SELECT * 
    FROM StockOrder 
    WHERE id = orderId 
    AND company_id = companyId
    LIMIT 1