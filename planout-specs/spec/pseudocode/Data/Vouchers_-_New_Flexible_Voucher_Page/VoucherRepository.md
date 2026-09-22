/**
 * Handles persistence logic for the Flexible Voucher product.
 * Maps incoming JSON payload from POST /api/vouchers/flexible to the Voucher entity.
 */

FUNCTION createFlexibleVoucher(payload):
    // Validate SKU uniqueness
    IF EXISTS(SELECT id FROM Voucher WHERE sku = payload.sku):
        THROW Error("SKU already exists")

    // Construct entity object
    NEW_VOUCHER = {
        id: GENERATE_UUID(),
        sku: payload.sku,
        name: payload.name,
        description: payload.description,
        open_price: payload.open_price,
        price_ex_tax: payload.price_ex_tax,
        value: payload.value,
        expire_in_months: payload.expire_in_months,
        expire_in_days: payload.expire_in_days,
        product_condition: payload.product_condition,
        sell_issue_locations: JSON_ENCODE(payload.sell_issue_locations),
        receive_redeem_locations: JSON_ENCODE(payload.receive_redeem_locations),
        valid_for_member: payload.valid_for_member,
        valid_from: payload.valid_from,
        valid_until: payload.valid_until,
        external_publisher: payload.external_publisher,
        created_at: CURRENT_TIMESTAMP()
    }

    // Persist to database
    INSERT INTO Voucher VALUES NEW_VOUCHER
    RETURN NEW_VOUCHER