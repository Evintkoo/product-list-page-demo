/**
 * API Controller for handling Company List requests.
 */

ROUTE GET /companies:
    TRY:
        // Invoke service to get mapped company data
        SET data = CompanyService.fetchAllCompanies()
        
        // Return the list of companies with a 200 OK status
        RETURN HTTP 200, data
    CATCH error:
        // Handle potential retrieval errors
        RETURN HTTP 500, { "error": "Failed to retrieve company list" }