/**
 * Data access layer definitions for Voucher entities.
 * These schemas enforce the structure for the Voucher, Sell Location, and Redeem Location tables.
 */

DEFINE SCHEMA VoucherTable:
    voucher_id: UUID (Primary)
    product_id: UUID (FK: Product.product_id)
    voucher_type: ENUM('standard', 'batch', 'flexible')
    price_ex_tax: NUMBER (Min: 0)
    value: NUMBER (Min: 0)
    open_price: BOOLEAN
    sell_location_scope: ENUM('all', 'specific')
    redeem_location_scope: ENUM('all', 'specific')
    member_only: BOOLEAN
    valid_from: DATE (Nullable)
    valid_until: DATE (Nullable)
    status: ENUM('active', 'inactive', 'expired')
    created_at: DATETIME
    updated_at: DATETIME

DEFINE SCHEMA VoucherSellLocationTable:
    voucher_sell_location_id: UUID (Primary)
    voucher_id: UUID (FK: Voucher.voucher_id)
    store_id: UUID (FK: Store.store_id)
    created_at: DATETIME

DEFINE SCHEMA VoucherRedeemLocationTable:
    voucher_redeem_location_id: UUID (Primary)
    voucher_id: UUID (FK: Voucher.voucher_id)
    store_id: UUID (FK: Store.store_id)
    created_at: DATETIME