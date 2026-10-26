/**
 * Node ID: 48ecce6c-246f-4063-bece-9688031d82e1
 * Title: Data Persistence Layer
 * Description: Defines the structure for storing purchase records.
 */

-- Table: PURCHASE
-- Stores individual purchase transactions linked to products.
CREATE TABLE PURCHASE (
  id UUID PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES PRODUCT(id),
  supplier_name VARCHAR(255) NOT NULL,
  purchase_date TIMESTAMP NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(19, 4) NOT NULL
);

-- Index for performance on the primary lookup path
CREATE INDEX idx_purchase_product_date ON PURCHASE(product_id, purchase_date DESC);

Notes covered:
- None (This node serves as the structural definition for the data layer)