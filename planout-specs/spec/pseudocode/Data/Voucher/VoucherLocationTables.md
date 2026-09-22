/* 
   Voucher Sell Location Table
   - Stores specific store mappings for vouchers where sell_location_scope = 'specific'.
   - Unique constraint ensures a store cannot be added twice to the same voucher.
*/
CREATE TABLE VoucherSellLocation (
    voucher_sell_location_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voucher_id UUID NOT NULL REFERENCES Voucher(voucher_id),
    store_id UUID NOT NULL, -- References Store Table
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(voucher_id, store_id)
);

CREATE INDEX idx_vsl_voucher_id ON VoucherSellLocation(voucher_id);
CREATE INDEX idx_vsl_store_id ON VoucherSellLocation(store_id);

/* 
   Voucher Redeem Location Table
   - Stores specific store mappings for vouchers where redeem_location_scope = 'specific'.
   - Unique constraint ensures a store cannot be added twice to the same voucher.
*/
CREATE TABLE VoucherRedeemLocation (
    voucher_redeem_location_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voucher_id UUID NOT NULL REFERENCES Voucher(voucher_id),
    store_id UUID NOT NULL, -- References Store Table
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(voucher_id, store_id)
);

CREATE INDEX idx_vrl_voucher_id ON VoucherRedeemLocation(voucher_id);
CREATE INDEX idx_vrl_store_id ON VoucherRedeemLocation(store_id);