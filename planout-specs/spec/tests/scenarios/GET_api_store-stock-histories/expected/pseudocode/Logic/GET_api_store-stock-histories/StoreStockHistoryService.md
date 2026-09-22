FUNCTION findMany(filters, pagination):
    // Build query based on StoreStockHistory schema
    query = Database.table("StoreStockHistory")
    
    IF filters.store_id: query.where("store_id", "LIKE", filters.store_id)
    IF filters.product_id: query.where("product_id", "LIKE", filters.product_id)
    IF filters.transaction_type: query.where("transaction_type", "LIKE", filters.transaction_type)
    IF filters.created_at_start: query.where("created_at", ">=", filters.created_at_start)
    IF filters.created_at_end: query.where("created_at", "<=", filters.created_at_end)
    IF filters.created_by: query.where("created_by", "LIKE", filters.created_by)

    // Execute count and paginated fetch
    totalCount = query.count()
    items = query.offset((pagination.page - 1) * pagination.pageSize)
                 .limit(pagination.pageSize)
                 .orderBy("created_at", "DESC")
                 .execute()

    RETURN { items, page: pagination.page, pageSize: pagination.pageSize, totalCount }