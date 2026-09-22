/**
 * Handles the creation of a new flexible voucher product.
 * Validates incoming request data and persists to the Voucher entity.
 */
function createFlexibleVoucher(request) {
    const voucherData = request.body;

    // 1. Validate required fields (SKU, Name, etc.)
    validateVoucherInput(voucherData);

    // 2. Map request payload to Voucher entity structure
    const newVoucher = {
        id: generateUUID(),
        sku: voucherData.sku,
        name: voucherData.name,
        description: voucherData.description,
        open_price: voucherData.open_price,
        price_ex_tax: voucherData.price_ex_tax,
        value: voucherData.value,
        expire_in_months: voucherData.expire_in_months,
        expire_in_days: voucherData.expire_in_days,
        product_condition: voucherData.product_condition,
        sell_issue_locations: voucherData.sell_issue_locations,
        receive_redeem_locations: voucherData.receive_redeem_locations,
        valid_for_member: voucherData.valid_for_member,
        valid_from: voucherData.valid_from,
        valid_until: voucherData.valid_until,
        external_publisher: voucherData.external_publisher,
        created_at: getCurrentTimestamp()
    };

    // 3. Persist to database
    const savedVoucher = Database.Voucher.insert(newVoucher);

    return {
        status: 201,
        body: savedVoucher
    };
}