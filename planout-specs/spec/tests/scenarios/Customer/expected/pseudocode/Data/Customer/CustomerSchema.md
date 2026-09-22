// Database constraints and indexes for the Customer domain.

CREATE TABLE Customer (
  customer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_code VARCHAR(60),
  name VARCHAR(150) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  -- ... (all fields defined in schema block)
  CONSTRAINT unique_customer_code_per_company UNIQUE (company_id, customer_code)
);

CREATE INDEX idx_customer_name_trgm ON Customer USING GIN (name gin_trgm_ops);
CREATE INDEX idx_customer_sanitized_phone ON Customer (sanitized_phone);
CREATE INDEX idx_customer_store_active_name ON Customer (store_id, is_active, name);

-- Trigger to maintain updated_at
CREATE TRIGGER trg_update_customer_timestamp
BEFORE UPDATE ON Customer
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();