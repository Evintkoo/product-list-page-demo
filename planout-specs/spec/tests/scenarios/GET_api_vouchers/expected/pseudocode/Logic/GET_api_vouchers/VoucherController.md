/**
 * Controller for handling GET /api/vouchers requests.
 * Orchestrates the retrieval of filtered voucher lists.
 */
function getVouchers(request) {
    // 1. Authentication Check
    if (!request.user.isAuthenticated) {
        return respond(401, { error: "Unauthorized", message: "User is not signed in" });
    }

    // 2. Extract and Validate Query Parameters
    const filters = {
        voucher_type: request.query.voucher_type, // Optional: standard, batch, flexible
        sku: request.query.sku,
        name: request.query.name,
        status: request.query.status, // Optional: active, inactive, expired
        search: request.query.search,
        limit: parseInt(request.query.limit) || 20,
        offset: parseInt(request.query.offset) || 0
    };

    // Validate parameters (e.g., check if status or voucher_type are within allowed enums)
    if (!isValid(filters)) {
        return respond(400, { error: "Bad Request", message: "Invalid query parameters provided" });
    }

    // 3. Execute Query
    try {
        const vouchers = VoucherService.fetchVoucherList(filters);
        return respond(200, vouchers);
    } catch (error) {
        return respond(500, { error: "Internal Server Error", message: "An unexpected error occurred" });
    }
}