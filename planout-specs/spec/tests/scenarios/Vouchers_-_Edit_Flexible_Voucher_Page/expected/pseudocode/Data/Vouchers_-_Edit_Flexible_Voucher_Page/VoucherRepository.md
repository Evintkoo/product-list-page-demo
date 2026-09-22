/**
 * Data access layer for VoucherFlexible entities.
 * Handles persistence logic for the Edit Flexible Voucher feature.
 */

FUNCTION getVoucherById(id: UUID):
    RETURN DB.VoucherFlexible.findUnique({
        WHERE: { id: id }
    })

FUNCTION updateVoucher(id: UUID, data: Object):
    // Maps incoming request body to database schema fields
    RETURN DB.VoucherFlexible.update({
        WHERE: { id: id },
        DATA: {
            sku: data.sku,
            name: data.name,
            description: data.description,
            open_price: data.open_price,
            price_ex_tax: data.price_ex_tax,
            value: data.value,
            expire_in_months: data.expire_in_months,
            expire_in_days: data.expire_in_days,
            product_condition: data.product_condition,
            sell_issue_locations: data.sell_issue_locations,
            receive_redeem_locations: data.receive_redeem_locations,
            valid_for_member: data.valid_for_member,
            valid_from: data.valid_from,
            valid_until: data.valid_until,
            external_publisher: data.external_publisher
        }
    })