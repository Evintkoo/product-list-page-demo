/* 
   Core Voucher Definition Table
   - Enforces unique product association to prevent duplicate voucher definitions for the same SKU.
   - Tracks audit trail via creator_id and updater_id.
*/
CREATE TABLE Voucher (
    voucher_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL UNIQUE,
    voucher_type VARCHAR(20) NOT NULL, -- standard, batch, flexible
    price_ex_tax NUMERIC(18,2) NOT NULL DEFAULT 0,
    value NUMERIC(18,2) NOT NULL DEFAULT 0,
    open_price BOOLEAN NOT NULL DEFAULT false,
    sell_location_scope VARCHAR(20) NOT NULL DEFAULT 'all', -- all, specific
    redeem_location_scope VARCHAR(20) NOT NULL DEFAULT 'all', -- all, specific
    member_only BOOLEAN NOT NULL DEFAULT false,
    valid_from DATE,
    valid_until DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expire_in_months INTEGER,
    expire_in_days INTEGER,
    external_publisher VARCHAR(150),
    creator_id UUID,
    updater_id UUID
);

CREATE INDEX idx_voucher_type ON Voucher(voucher_type);
CREATE INDEX idx_voucher_status ON Voucher(status);
CREATE INDEX idx_voucher_type_status ON Voucher(voucher_type, status);
CREATE INDEX idx_voucher_validity ON Voucher(valid_from, valid_until);