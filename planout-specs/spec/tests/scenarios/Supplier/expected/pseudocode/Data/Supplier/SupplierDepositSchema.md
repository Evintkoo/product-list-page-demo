CREATE TABLE supplier_deposit (
    supplier_deposit_id UUID PRIMARY KEY,
    supplier_id UUID UNIQUE NOT NULL REFERENCES supplier(supplier_id),
    balance NUMERIC(18,2) NOT NULL DEFAULT 0,
    last_deposit_received_at DATE,
    last_deposit_used_at DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE supplier_deposit_transaction (
    supplier_deposit_transaction_id UUID PRIMARY KEY,
    supplier_deposit_id UUID NOT NULL REFERENCES supplier_deposit(supplier_deposit_id),
    coa_id UUID NOT NULL,
    transaction_date DATE NOT NULL,
    amount NUMERIC(18,2) NOT NULL,
    notes TEXT,
    creator_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE INDEX idx_supplier_deposit_tx_composite ON supplier_deposit_transaction (supplier_deposit_id, transaction_date DESC);
CREATE INDEX idx_supplier_deposit_tx_date ON supplier_deposit_transaction (transaction_date);