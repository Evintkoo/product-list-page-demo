CREATE TABLE supplier_history (
    supplier_history_id UUID PRIMARY KEY,
    supplier_id UUID NOT NULL REFERENCES supplier(supplier_id),
    name VARCHAR(150),
    address TEXT,
    phone VARCHAR(32),
    fax VARCHAR(32),
    email VARCHAR(255),
    contact_name VARCHAR(150),
    registration_no VARCHAR(60),
    tax_no VARCHAR(60),
    credit_term_days INTEGER,
    credit_limit NUMERIC(18,2),
    updater_id UUID,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_supplier_history_lookup ON supplier_history (supplier_id, updated_at DESC);