/**
 * Logic for querying the Account entity with specific business constraints.
 */
function findAccounts(filters) {
    // Base query: Only active and postable accounts for the specific company
    let query = Database.Account.where({
        company_id: filters.company_id,
        is_active: true,
        is_postable: true
    });

    // Apply search filter (partial match on code or name)
    if (filters.search) {
        query = query.where(
            "code LIKE ? OR name LIKE ?", 
            [`%${filters.search}%`, `%${filters.search}%`]
        );
    }

    // Apply account_type filter if provided
    if (filters.account_type) {
        query = query.where({ account_type: filters.account_type });
    }

    // Apply pagination
    return query
        .limit(filters.limit)
        .offset(filters.offset)
        .select("id", "code", "name", "account_type")
        .execute();
}