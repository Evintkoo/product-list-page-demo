/**
 * Fetches a paginated list of customers based on dynamic filters, 
 * search criteria, and sorting requirements.
 */
function findCustomers(filters, search, sort, pagination) {
    // 1. Build base query from Customer table
    let query = db.selectFrom("Customer");

    // 2. Apply Type Filtering
    // Mapping: retail (all false), wholesale (is_wholesale=true), 
    // franchise (is_franchise=true), consignment (is_consignment=true)
    if (filters.type === 'retail') {
        query = query.where("is_wholesale", "=", false)
                     .where("is_franchise", "=", false)
                     .where("is_consignment", "=", false);
    } else if (filters.type === 'wholesale') {
        query = query.where("is_wholesale", "=", true);
    } else if (filters.type === 'franchise') {
        query = query.where("is_franchise", "=", true);
    } else if (filters.type === 'consignment') {
        query = query.where("is_consignment", "=", true);
    }

    // 3. Apply Exact Match Filters
    const exactFields = [
        "customer_group_id", "customer_code", "tax_no", "name", 
        "phone", "birthdate", "store_id", "is_active", "address", "salesperson_id"
    ];
    
    exactFields.forEach(field => {
        if (filters[field] !== undefined) {
            query = query.where(field, "=", filters[field]);
        }
    });

    // 4. Apply General Search
    if (search) {
        query = query.where((qb) => qb
            .where("customer_code", "LIKE", `%${search}%`)
            .orWhere("name", "LIKE", `%${search}%`)
            .orWhere("phone", "LIKE", `%${search}%`)
            .orWhere("email", "LIKE", `%${search}%`)
            .orWhere("tax_no", "LIKE", `%${search}%`)
        );
    }

    // 5. Apply Sorting
    // Default: created_at DESC
    const sortMap = { "group": "customer_group_id", "code": "customer_code", "name": "name" };
    const sortBy = sortMap[sort.sort_by] || "created_at";
    const sortOrder = sort.sort_order === "asc" ? "ASC" : "DESC";
    query = query.orderBy(sortBy, sortOrder);

    // 6. Apply Pagination
    const totalCount = query.count();
    const data = query.limit(pagination.limit)
                      .offset(pagination.offset)
                      .execute();

    return { data, totalCount };
}