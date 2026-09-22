FUNCTION fetchList(page, page_limit, modified_after, active, sort_by, sort_direction, after_id):
    // Build query for Warehouse entity
    SET query = Warehouse.find()

    // Apply Filters
    IF active IS NOT NULL:
        query.where("active", EQUALS, active)
    
    IF modified_after IS NOT NULL:
        query.where("updated_at", GREATER_THAN, modified_after)
    
    IF after_id IS NOT NULL:
        query.where("id", GREATER_THAN, after_id)

    // Apply Sorting
    query.orderBy(sort_by, sort_direction)

    // Apply Pagination
    IF after_id IS NULL:
        query.offset((page - 1) * page_limit)
    
    query.limit(page_limit)

    RETURN query.execute()