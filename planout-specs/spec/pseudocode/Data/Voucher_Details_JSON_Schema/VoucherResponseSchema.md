/**
 * Defines the shape of the data returned to the API layer.
 * This ensures consistency between the database query and the JSON response.
 */

TYPE VoucherResponse = {
    voucher_id: UUID,
    product_id: UUID,
    product_sku: STRING,
    product_name: STRING,
    voucher_type: "standard" | "batch" | "flexible",
    price_ex_tax: NUMBER,
    value: NUMBER,
    open_price: BOOLEAN,
    valid_from: DATETIME | NULL,
    valid_until: DATETIME | NULL,
    status: "active" | "inactive" | "expired",
    created_at: DATETIME,
    updated_at: DATETIME
}