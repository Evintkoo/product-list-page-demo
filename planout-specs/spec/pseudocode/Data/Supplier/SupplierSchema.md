-- Primary Table: Supplier
-- Uses UUIDv7 for time-ordered primary keys
CREATE TABLE supplier (
    supplier_id UUID PRIMARY KEY,
    supplier_code VARCHAR(60),
    name VARCHAR(150) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_internal BOOLEAN NOT NULL DEFAULT FALSE,
    is_consignment BOOLEAN NOT NULL DEFAULT FALSE,
    can_spo BOOLEAN NOT NULL DEFAULT FALSE,
    company_id UUID NOT NULL,
    contact_name VARCHAR(150) NOT NULL,
    phone VARCHAR(32),
    mobile VARCHAR(32),
    fax VARCHAR(32),
    email VARCHAR(255),
    address TEXT NOT NULL,
    country VARCHAR(60) DEFAULT 'Indonesia',
    currency CHAR(3) DEFAULT 'IDR',
    tax_no VARCHAR(60),
    registration_no VARCHAR(60),
    tax_id UUID,
    pricelist_id UUID,
    credit_term_days INTEGER NOT NULL DEFAULT 0,
    credit_limit NUMERIC(18,2) NOT NULL DEFAULT 0,
    bank_details TEXT,
    notes TEXT,
    coa_id_ap_inventory_purchases UUID,
    coa_id_ap_for_credit_note UUID,
    coa_id_ap_for_credit_note_consignment UUID,
    coa_id_supplier_down_payment UUID,
    coa_id_deposit UUID,
    creator_id UUID,
    updater_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- Partial Unique Index for Supplier Code (excludes internal suppliers)
CREATE UNIQUE INDEX idx_supplier_company_code_unique 
ON supplier (company_id, supplier_code) 
WHERE supplier_code IS NOT NULL;

-- Composite Indexes for common list views
CREATE INDEX idx_supplier_active_list ON supplier (company_id, name) WHERE is_active = TRUE;
CREATE INDEX idx_supplier_internal_list ON supplier (company_id) WHERE is_active = TRUE AND is_internal = TRUE;

-- Trigram index for name search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_supplier_name_trgm ON supplier USING GIN (name gin_trgm_ops);