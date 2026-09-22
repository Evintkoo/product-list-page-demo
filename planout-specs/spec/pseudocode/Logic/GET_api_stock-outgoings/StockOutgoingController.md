/**
 * Handles the retrieval of stock outgoing records.
 * Enforces company isolation via session and applies fixed pagination.
 */
function getStockOutgoings(request) {
    // 1. Extract session context
    const companyId = request.session.company_id;
    
    // 2. Extract and validate query parameters
    const { page = 1, status, from_date, to_date, sort_by = 'created_at', sort_order = 'desc' } = request.query;
    
    // Validate date range logic
    if (from_date && to_date && new Date(from_date) > new Date(to_date)) {
        return response.error(422, "from_date cannot be after to_date");
    }

    // 3. Build Query
    // Base query: Filter by company_id from session
    let query = db.StockOutgoing.where({ company_id: companyId });

    // Apply optional filters
    if (status) {
        // Validate status against allowed list: draft, confirmed, approved, cancelled
        if (!['draft', 'confirmed', 'approved', 'cancelled'].includes(status)) {
            return response.error(422, "Invalid status value");
        }
        query = query.where({ status: status });
    }

    if (from_date) query = query.where('created_at', '>=', from_date);
    if (to_date) query = query.where('created_at', '<=', to_date);

    // 4. Handle Joins for Sorting
    // Sorting by 'source' requires joining Location
    // Sorting by 'user' requires joining User
    if (sort_by === 'source') {
        query = query.leftJoin('Location', 'StockOutgoing.source_id', 'Location.id')
                     .orderBy('Location.name', sort_order);
    } else if (sort_by === 'user') {
        query = query.leftJoin('User', 'StockOutgoing.created_by_user_id', 'User.id')
                     .orderBy('User.name', sort_order);
    } else {
        // Default sorting
        query = query.orderBy(sort_by, sort_order);
    }

    // 5. Pagination (Fixed page size of 20)
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    
    const results = query.limit(pageSize).offset(offset).execute();

    // 6. Return response
    return response.ok(results);
}