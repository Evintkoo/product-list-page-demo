/**
 * Retrieves a paginated list of Stock Returns based on filters.
 * 
 * @param {Object} filters
 * @param {string} filters.type - Must be 'warehouse'
 * @param {string} [filters.reference] - Partial match on ref_code
 * @param {Date} [filters.from_date] - Inclusive lower bound for created_at
 * @param {Date} [filters.to_date] - Inclusive upper bound for created_at
 * @param {UUID} [filters.store_id] - Maps to sender_location_id
 * @param {UUID} [filters.warehouse_id] - Maps to receiver_location_id
 * @param {string} [filters.status] - Maps to workflow_state
 * @param {number} page - Page number
 * @param {number} rows - Rows per page
 */
function getStockReturnList(filters, page = 1, rows = 20) {
    // 1. Validate business rules
    if (filters.type !== 'warehouse') {
        throw new Error("INVALID_TYPE");
    }
    if (filters.from_date && filters.to_date && filters.from_date > filters.to_date) {
        throw new Error("INVALID_DATE_RANGE");
    }

    // 2. Build Query
    let query = DB.table('StockReturn')
        .select(
            'StockReturn.*',
            'User.name as creator_name'
        )
        .leftJoin('User', 'StockReturn.creator_id', '=', 'User.id')
        .where('StockReturn.type', '=', 'warehouse');

    // 3. Apply Filters
    if (filters.reference) {
        query.where('ref_code', 'LIKE', `%${filters.reference}%`);
    }
    if (filters.from_date) {
        query.where('created_at', '>=', filters.from_date);
    }
    if (filters.to_date) {
        query.where('created_at', '<=', filters.to_date);
    }
    if (filters.store_id) {
        query.where('sender_location_id', '=', filters.store_id);
    }
    if (filters.warehouse_id) {
        query.where('receiver_location_id', '=', filters.warehouse_id)
             .where('receiver_location_type', '=', 'warehouse');
    }
    if (filters.status) {
        query.where('workflow_state', '=', filters.status);
    }

    // 4. Execute with Pagination and Sorting
    return query
        .orderBy('created_at', 'DESC')
        .limit(rows)
        .offset((page - 1) * rows)
        .execute();
}