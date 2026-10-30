/**
 * Node: GET /api/store-stock-histories (d291390f-e35c-4896-b906-7f852a4ee691)
 * Description: Returns a paginated list of store stock history records based on query parameters.
 */
async function getStoreStockHistories(req, res) {
    // 1. Authentication Check
    if (!req.session || !req.session.isValid) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        // 2. Extract and Validate Query Parameters
        // Receives: Query Parameter Shape (e4e88b17-392d-4053-ad11-27501359828e)
        const { q, utf8 } = req.query;
        
        if (!utf8) {
            return res.status(422).json({ error: "Missing required parameter: utf8" });
        }

        // 3. Build Query Filters
        const filters = {};
        if (q?.store_id_eq) filters.store_id = q.store_id_eq;
        if (q?.transaction_type_eq) filters.transaction_type = q.transaction_type_eq;
        if (q?.created_at_dategteq) filters.created_at_gte = q.created_at_dategteq;
        if (q?.created_at_datelteq) filters.created_at_lte = q.created_at_datelteq;
        if (q?.created_by_cont) filters.created_by_like = q.created_by_cont;

        // 4. Fetch Data
        // Logic: Query StoreStockHistory using filters and pagination
        const { data, pagination } = await StockHistoryService.find(filters, req.query.page, req.query.pageSize);

        // 5. Success Response
        // Connection: "response shape" to Data swimlane
        return res.status(200).json({
            data: data,
            page: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total
        });

    } catch (error) {
        // 6. Error Handling
        // Connection: "HTTP 500 Internal Server Error" to Data swimlane
        return res.status(500).json({ error: "An unexpected server error occurred while querying stock history." });
    }
}

/* 
Notes covered:
- Returns a paginated list of store stock history records.
- Receives query parameters to sort and filter the result.
- On success, response includes data array plus pagination metadata (page, pageSize, total).
- If unauthenticated or session invalid, returns HTTP 401 Unauthorized.
- If unexpected server error, returns HTTP 500 Internal Server Error with error message body.
*/