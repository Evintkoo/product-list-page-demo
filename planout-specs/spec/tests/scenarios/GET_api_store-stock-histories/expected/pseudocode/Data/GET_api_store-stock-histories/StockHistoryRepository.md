/**
 * Fetches paginated stock history records from the database based on dynamic filters.
 * 
 * @param filters - Object containing query parameters (store_id_cont, product_id_cont, etc.)
 * @param page - Current page number for pagination
 * @param pageSize - Number of records per page
 * @returns A promise resolving to the list of records and total count
 */
FUNCTION getStockHistories(filters, page, pageSize) {
    // Initialize base query
    query = DATABASE.table("StoreStockHistory").select("*");

    // Apply filters based on the StockTransactionsQueryParams schema
    IF (filters.store_id_cont) {
        query.where("store_id", "LIKE", "%" + filters.store_id_cont + "%");
    }
    IF (filters.product_id_cont) {
        query.where("product_id", "LIKE", "%" + filters.product_id_cont + "%");
    }
    IF (filters.transaction_type_cont) {
        query.where("transaction_type", "LIKE", "%" + filters.transaction_type_cont + "%");
    }
    IF (filters.created_at_dategteq) {
        query.where("created_at", ">=", filters.created_at_dategteq);
    }
    IF (filters.created_at_datelteq) {
        query.where("created_at", "<=", filters.created_at_datelteq);
    }
    IF (filters.created_by_cont) {
        query.where("created_by", "LIKE", "%" + filters.created_by_cont + "%");
    }

    // Apply pagination
    offset = (page - 1) * pageSize;
    
    // Execute count and data fetch
    totalCount = query.count();
    data = query.limit(pageSize).offset(offset).orderBy("created_at", "DESC").execute();

    RETURN {
        data: data,
        pagination: {
            page: page,
            pageSize: pageSize,
            total: totalCount
        }
    };
}