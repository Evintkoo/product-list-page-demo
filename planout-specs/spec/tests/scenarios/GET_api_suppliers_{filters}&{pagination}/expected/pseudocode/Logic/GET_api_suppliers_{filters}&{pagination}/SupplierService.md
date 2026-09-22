/**
 * Business logic for retrieving filtered supplier lists.
 */
function fetchSuppliers(companyId, filters, pagination) {
    // 1. Build base query scoped to the user's company
    let query = DB.Supplier.where("company_id", companyId);

    // 2. Apply dynamic filters if provided
    if (filters.name) {
        query = query.where("name", "LIKE", `%${filters.name}%`);
    }
    if (filters.status) {
        query = query.where("status", filters.status);
    }
    if (filters.tax_id) {
        query = query.where("tax_id", filters.tax_id);
    }

    // 3. Apply mandatory ordering and pagination
    // Results are always ordered by name ascending
    return query
        .orderBy("name", "ASC")
        .limit(pagination.limit)
        .offset(pagination.offset)
        .execute();
}