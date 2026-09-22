CREATE TABLE product_supplier (
    product_supplier_id UUID PRIMARY KEY,
    supplier_id UUID NOT NULL REFERENCES supplier(supplier_id),
    product_id UUID NOT NULL,
    discount_rate NUMERIC(5,2) DEFAULT 0,
    valid_from DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    UNIQUE(supplier_id, product_id)
);

CREATE INDEX idx_product_supplier_lookup ON product_supplier (product_id);