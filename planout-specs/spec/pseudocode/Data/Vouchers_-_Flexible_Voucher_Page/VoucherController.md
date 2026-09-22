/**
 * GET /api/vouchers
 * Retrieves a list of vouchers filtered by type and optional search parameters.
 * 
 * Query Parameters:
 * - voucher_type (required): "flexible"
 * - sku (optional): string
 * - name (optional): string
 */
function getVouchers(request) {
    const { voucher_type, sku, name } = request.query;

    // Validate voucher_type is "flexible"
    if (voucher_type !== 'flexible') {
        return response.error(400, "Invalid voucher type");
    }

    // Build query filters
    const filters = { voucher_type };
    if (sku) filters.sku = { contains: sku };
    if (name) filters.name = { contains: name };

    // Fetch from database
    const vouchers = db.Voucher.findMany({
        where: filters
    });

    return response.success(200, {
        data: vouchers.map(formatVoucherResponse)
    });
}

/**
 * Maps database entity to the API response structure
 */
function formatVoucherResponse(voucher) {
    return {
        voucher_id: voucher.voucher_id,
        product_id: voucher.product_id,
        sku: voucher.sku,
        name: voucher.name,
        price_ex_tax: voucher.price_ex_tax,
        value: voucher.value,
        open_price: voucher.open_price,
        sell_locations: voucher.sell_locations,
        redeem_locations: voucher.redeem_locations,
        sell_location_scope: voucher.sell_location_scope,
        redeem_location_scope: voucher.redeem_location_scope,
        member_only: voucher.member_only,
        valid_from: voucher.valid_from,
        valid_until: voucher.valid_until,
        status: voucher.status
    };
}