/**
 * Controller handling the retrieval of store records.
 */
FUNCTION handleGetStores(request):
    // 1. Validate authentication session
    IF NOT isAuthenticated(request.headers.authorization):
        RETURN HTTP 401 Unauthorized

    TRY:
        // 2. Fetch all stores from the database
        stores = StoreService.getAllStores()
        
        // 3. Return the list of stores
        RETURN HTTP 200 OK, body: stores
    CATCH error:
        // 4. Handle unexpected server errors
        RETURN HTTP 500 Internal Server Error, body: { "error": "Failed to retrieve store list" }