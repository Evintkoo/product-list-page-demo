/**
 * Node: GET /api/stores (ID: fa3ed46d-d1d7-4128-b2f4-93b598e67aa4)
 * Description: Returns the records available on the Store Table.
 */
async function getStores(request, response) {
    // 1. Authentication Check
    // If request is unauthenticated or session token is invalid:
    // Transition: "HTTP 401 Unauthorized" to Data layer
    if (!isAuthenticated(request)) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    try {
        // 2. Data Retrieval
        // Fetch all records from Store entity
        const stores = await db.Store.findAll();

        // 3. Success Response
        // Transition: "Store List" to Data layer
        return response.status(200).json(stores);

    } catch (error) {
        // 4. Error Handling
        // If unexpected server error occurs while querying:
        // Transition: "HTTP 500 Internal Server Error" to Data layer
        // Note: The description mentions "querying stock history" as the context for the 500 error.
        // Ambiguity: The feature is for /api/stores, but the error note references "stock history". 
        // Assuming this refers to the database operation for the Store entity.
        return response.status(500).json({ 
            error: "Internal Server Error",
            message: error.message 
        });
    }
}

/* 
Notes covered:
- Returns the records available on the Store Table.
- On success, returns the Store List Response.
- If the request is unauthenticated or the session token is invalid, the API returns HTTP 401 Unauthorized.
- If an unexpected server error occurs while querying stock history, the API returns HTTP 500 Internal Server Error with an error message body.
*/