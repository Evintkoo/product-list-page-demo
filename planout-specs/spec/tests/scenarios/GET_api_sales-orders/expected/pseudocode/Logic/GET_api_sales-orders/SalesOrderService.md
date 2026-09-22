FUNCTION fetchList(companyId, params):
    // Build query for SalesOrder entity
    query = SalesOrder.find().where(company_id == companyId)

    // Apply filters
    IF params.filters.document_number:
        query.where(document_number == params.filters.document_number)
    
    IF params.filters.purchase_order_number:
        query.where(purchase_order_number == params.filters.purchase_order_number)
        
    IF params.filters.from_date:
        query.where(created_at >= params.filters.from_date)
        
    IF params.filters.to_date:
        query.where(created_at <= params.filters.to_date)
        
    IF params.filters.warehouse_id:
        query.where(warehouse_id == params.filters.warehouse_id)
        
    IF params.filters.customer:
        query.where(customer == params.filters.customer)
        
    IF params.filters.salesperson:
        query.where(salesperson == params.filters.salesperson)
        
    IF params.filters.status:
        query.where(status == params.filters.status)

    // Apply pagination and sorting
    query.orderBy(params.sort, params.direction)
    query.limit(params.limit)
    query.offset(params.offset)

    RETURN query.execute()