/**
 * Logic for mapping the API response to the UI Table Component
 */
function mapVoucherToTable(voucher) {
    return {
        id: voucher.voucher_id, // Used for row identification
        sku: voucher.sku,
        name: voucher.name,
        price_ex_tax: voucher.price_ex_tax,
        value: voucher.value,
        open_price: voucher.open_price,
        sell_locations: voucher.sell_locations,
        redeem_locations: voucher.redeem_locations,
        member_only: voucher.member_only ? "Yes" : "No",
        valid_from: voucher.valid_from,
        valid_until: voucher.valid_until,
        status: voucher.status,
        // Hidden metadata for internal logic
        _internal: {
            product_id: voucher.product_id,
            sell_location_scope: voucher.sell_location_scope,
            redeem_location_scope: voucher.redeem_location_scope
        }
    };
}