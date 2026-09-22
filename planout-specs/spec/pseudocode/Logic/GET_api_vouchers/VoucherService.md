/**
 * Service layer for Voucher data access.
 */
function fetchVoucherList(filters) {
    // Build query based on provided filters
    let query = Database.Voucher.find();

    if (filters.voucher_type) {
        query = query.where("voucher_type", filters.voucher_type);
    }
    if (filters.sku) {
        query = query.where("sku", filters.sku);
    }
    if (filters.name) {
        query = query.where("name", filters.name);
    }
    if (filters.status) {
        query = query.where("status", filters.status);
    }
    if (filters.search) {
        // Search across SKU and Name
        query = query.whereOr([
            { "sku": { "contains": filters.search } },
            { "name": { "contains": filters.search } }
        ]);
    }

    // Apply pagination
    query = query.limit(filters.limit).offset(filters.offset);

    return query.execute();
}