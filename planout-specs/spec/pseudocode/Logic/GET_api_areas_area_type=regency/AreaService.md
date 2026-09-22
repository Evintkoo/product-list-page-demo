/**
 * Service layer for Area data access logic.
 */
function findRegencies(filters, pagination) {
    // Build query based on Area entity
    let query = Database.table("Area").where("area_type", "=", filters.area_type);

    // Apply optional filters
    if (filters.name) {
        query = query.where("name", "LIKE", `%${filters.name}%`);
    }

    if (filters.parent_id) {
        query = query.where("parent_id", "=", filters.parent_id);
    }

    // Apply default sorting
    query = query.orderBy("name", "ASC");

    // Apply pagination
    const offset = (pagination.page - 1) * pagination.pageSize;
    const results = query.limit(pagination.pageSize).offset(offset).execute();

    return results;
}