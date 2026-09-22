/**
 * Logic layer for Area data retrieval.
 */
function findVillages(filters) {
    // Base query: select from Area where area_type = 'village'
    let query = Database.Area.find({ area_type: 'village' });

    // Apply Name filter
    if (filters.name) {
        query = query.where("name", "LIKE", `%${filters.name}%`);
    }

    // Apply Hierarchy filters (parent_id)
    // Note: Logic assumes parent_id maps to the specific hierarchy level requested
    if (filters.district_id) {
        query = query.where("parent_id", filters.district_id);
    } else if (filters.regency_id) {
        query = query.where("parent_id", filters.regency_id);
    } else if (filters.province_id) {
        query = query.where("parent_id", filters.province_id);
    }

    // Apply Sorting
    query = query.orderBy("name", "ASC");

    // Apply Pagination
    const offset = (filters.page - 1) * filters.page_size;
    return query.limit(filters.page_size).offset(offset).execute();
}

<!-- MISSING_FIELD: Area.province_id -->
<!-- MISSING_FIELD: Area.regency_id -->
<!-- MISSING_FIELD: Area.district_id -->