/**
 * Retrieves paginated store stock history with filtering and aggregation.
 * 
 * @param filters { store_name, product_id, type, date_from, date_to }
 * @param pagination { limit, offset }
 * @param sorting { sort_by, sort_dir }
 */
FUNCTION getStoreStockHistory(filters, pagination, sorting):
    // Executes the complex join query across store_stock_history, store_stock, and store
    // 1. Filter by store_name (ILIKE), product_id, type, and date range
    // 2. Calculate total_count using window function
    // 3. Calculate total_qty_change (sum of increased - decreased) across the filtered set
    // 4. Apply dynamic sorting based on sort_by/sort_dir
    // 5. Apply pagination (LIMIT/OFFSET)
    
    RETURN queryResult {
        data: List<StoreStockHistoryRecord>,
        total_count: Integer,
        total_qty_change: Integer
    }