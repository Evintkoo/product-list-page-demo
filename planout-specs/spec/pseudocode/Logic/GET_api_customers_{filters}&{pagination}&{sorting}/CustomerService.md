FUNCTION findCustomers(params):
    // 1. Build Query Filters
    query = Customer.query()
    
    // Apply mandatory type filter
    query.where("type", params.type)
    
    // Apply dynamic filters if provided
    IF params.name: query.where("name", "LIKE", "%" + params.name + "%")
    IF params.status: query.where("status", params.status)
    IF params.phone: query.where("phone", params.phone)
    IF params.email: query.where("email", params.email)

    // 2. Apply Sorting
    sortField = params.sort OR "created_at"
    sortOrder = params.order OR "asc"
    query.orderBy(sortField, sortOrder)

    // 3. Apply Pagination
    page = params.page OR 1
    perPage = params.per_page OR 20
    offset = (page - 1) * perPage
    
    query.limit(perPage).offset(offset)

    // 4. Execute and Return
    customers = query.fetchAll()
    
    IF customers IS EMPTY:
        RETURN 404 Not Found <!-- MISSING_FIELD: Customer.error_message -->

    RETURN customers