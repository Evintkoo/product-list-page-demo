FUNCTION list(filters, limit, offset, sort, direction):
    // Construct database query for SalesOrderReturn
    // Scope to company_id
    QUERY q = SELECT * FROM SalesOrderReturn WHERE company_id = filters.company_id

    // Apply Filters
    IF filters.ref_code:
        q.WHERE(ref_code LIKE filters.ref_code + "%")
    IF filters.customer_name:
        q.WHERE(customer_name LIKE "%" + filters.customer_name + "%")
    IF filters.warehouse_id:
        q.WHERE(warehouse_id = filters.warehouse_id)
    IF filters.workflow_state:
        q.WHERE(workflow_state = filters.workflow_state)
    IF filters.created_at_range.from:
        q.WHERE(created_at >= filters.created_at_range.from)
    IF filters.created_at_range.to:
        q.WHERE(created_at <= filters.created_at_range.to)

    // Apply Pagination and Sorting
    q.ORDER_BY(sort, direction)
    q.LIMIT(limit)
    q.OFFSET(offset)

    RETURN q.execute()