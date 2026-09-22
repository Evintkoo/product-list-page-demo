FUNCTION getVehicles(request):
    // 1. Validate Query Parameters
    IF request.query.vehicle_type IS NOT NULL AND request.query.vehicle_type NOT IN ["Car", "Heavy Equipment", "Motorcycle"]:
        RETURN 400 "Invalid vehicle_type"

    IF request.query.date_field IS NOT NULL AND request.query.date_field NOT IN ["created_date", "registration_date"]:
        RETURN 400 "Invalid date_field"

    // 2. Initialize Query Builder
    query = Vehicle.findAll()

    // 3. Apply Filters
    IF request.query.vehicle_type:
        query.where(vehicle_type = request.query.vehicle_type)
    
    IF request.query.registration_no:
        query.where(registration_no = request.query.registration_no)
        
    IF request.query.hull_number:
        query.where(hull_number = request.query.hull_number)
        
    IF request.query.vin:
        query.where(vin = request.query.vin)
        
    IF request.query.fin:
        query.where(fin = request.query.fin)
        
    IF request.query.customer:
        query.where(customer = request.query.customer)
        
    IF request.query.store_id:
        query.where(store_id = request.query.store_id)

    // 4. Apply Date Range Filtering
    IF request.query.date_field AND (request.query.from_date OR request.query.to_date):
        target_field = request.query.date_field
        IF request.query.from_date:
            query.where(target_field >= request.query.from_date)
        IF request.query.to_date:
            query.where(target_field <= request.query.to_date)

    // 5. Apply General Search
    IF request.query.search:
        search_term = "%" + request.query.search + "%"
        query.where(
            registration_no LIKE search_term OR 
            hull_number LIKE search_term OR 
            vin LIKE search_term OR 
            customer LIKE search_term
        )

    // 6. Apply Sorting
    sort_field = request.query.sort_by OR "created_at"
    sort_dir = request.query.sort_order OR "desc"
    
    query.orderBy(sort_field, sort_dir)

    // 7. Execute and Return
    results = query.execute()
    RETURN 200, results

// Error Handling:
// If database connection fails, return 500.
// If authentication middleware fails, return 401.