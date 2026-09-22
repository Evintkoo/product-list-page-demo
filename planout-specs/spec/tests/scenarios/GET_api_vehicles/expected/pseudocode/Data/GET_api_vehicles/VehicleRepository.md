/**
 * Handles data retrieval for the Vehicle entity.
 * Implements filtering, searching, and sorting logic at the database level.
 */
function findVehicles(filters, sortOptions) {
    // 1. Initialize base query
    let query = Database.table("Vehicle");

    // 2. Apply Type Filtering
    if (filters.vehicle_type) {
        query = query.where("vehicle_type", "=", filters.vehicle_type);
    }

    // 3. Apply Exact Field Filtering
    const exactFields = ["registration_no", "hull_number", "vin", "fin", "customer", "store_id"];
    exactFields.forEach(field => {
        if (filters[field]) {
            query = query.where(field, "=", filters[field]);
        }
    });

    // 4. Apply Date Range Filtering
    if (filters.date_field && (filters.from_date || filters.to_date)) {
        const dateColumn = filters.date_field === "registration_date" ? "registration_date" : "created_date";
        
        if (filters.from_date) {
            query = query.where(dateColumn, ">=", filters.from_date);
        }
        if (filters.to_date) {
            query = query.where(dateColumn, "<=", filters.to_date);
        }
    }

    // 5. Apply General Search
    if (filters.search) {
        query = query.where(group => {
            group.where("registration_no", "LIKE", `%${filters.search}%`)
                 .orWhere("hull_number", "LIKE", `%${filters.search}%`)
                 .orWhere("vin", "LIKE", `%${filters.search}%`)
                 .orWhere("customer", "LIKE", `%${filters.search}%`);
        });
    }

    // 6. Apply Sorting
    const sortBy = sortOptions.sort_by || "created_at";
    const sortOrder = sortOptions.sort_order || "desc";
    
    query = query.orderBy(sortBy, sortOrder);

    return query.execute();
}