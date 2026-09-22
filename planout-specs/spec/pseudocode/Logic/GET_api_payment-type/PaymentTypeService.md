/**
 * Service to handle business logic for PaymentType entity.
 */
function list(companyId, filters) {
    // 1. Build base query
    let query = DB.PaymentType.where("company_id", companyId);

    // 2. Apply optional filters
    if (filters.is_active !== undefined) {
        query = query.where("is_active", filters.is_active);
    }
    if (filters.kind) {
        query = query.where("kind", filters.kind);
    }

    // 3. Get total count for pagination metadata
    const totalCount = query.count();

    // 4. Fetch paginated results ordered by name
    const data = query
        .orderBy("name", "ASC")
        .limit(filters.limit)
        .offset(filters.offset)
        .fetchAll();

    return {
        data: data,
        total_count: totalCount
    };
}