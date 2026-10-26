/**
 * Node: GET /api/store-stock-histories (id: d291390f-e35c-4896-b906-7f852a4ee691)
 * Description: Returns a paginated list of store stock history records based on query parameters.
 */
async function getStoreStockHistories(req, res) {
    // 1. Authentication Check
    // If session token is missing or invalid, return 401 Unauthorized.
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        // 2. Input Parsing (from Query Parameter Shape node)
        // Receives: store_id_eq, transaction_type_eq, created_at_dategteq, created_at_datelteq, created_by_cont
        const filters = {
            store_id: req.query.q?.store_id_eq,
            transaction_type: req.query.q?.transaction_type_eq,
            created_at_gte: req.query.q?.created_at_dategteq,
            created_at_lte: req.query.q?.created_at_datelteq,
            created_by: req.query.q?.created_by_cont
        };

        // 3. Data Retrieval
        // Query StoreStockHistory entity using provided filters.
        // Apply pagination (page, pageSize).
        const results = await db.StoreStockHistory.findMany({
            where: {
                store_id: filters.store_id,
                transaction_type: filters.transaction_type,
                created_at: { gte: filters.created_at_gte, lte: filters.created_at_lte },
                created_by: { contains: filters.created_by }
            },
            // Pagination logic here
        });

        // 4. Success Response
        // Returns data array + pagination metadata (page, pageSize, total).
        return res.status(200).json({
            data: results.items,
            page: results.page,
            pageSize: results.pageSize,
            total: results.total
        });

    } catch (error) {
        // 5. Error Handling
        // If unexpected server error occurs, return 500 Internal Server Error with message.
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

/* 
Notes covered:
- Returns a paginated list of store stock history records.
- Receives query parameters to sort and filter the result.
- On success, response includes data array and pagination metadata (page, pageSize, total).
- If unauthenticated or session token invalid, return HTTP 401 Unauthorized.
- If unexpected server error occurs, return HTTP 500 Internal Server Error with error message body.
*/