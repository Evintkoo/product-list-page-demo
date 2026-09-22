/* 
   Data Layer Definition for Service Product Module.
   Relationships:
   - ServiceProduct belongs to ServiceProductType (1:N)
   - ServiceProduct has many Tags via ServiceProductTagsMapping (M:N)
   - ServiceProduct references TaxUnitOfMeasure (1:N)
*/

CREATE TABLE ServiceProductType (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    service_advisor VARCHAR(100),
    refund_account VARCHAR(100),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE ServiceProduct (
    id INT PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    service_product_type_id INT REFERENCES ServiceProductType(id),
    price_ex_tax FLOAT,
    price FLOAT NOT NULL,
    tax_rate FLOAT,
    tax_name VARCHAR(100) NOT NULL,
    other_tax_rate FLOAT DEFAULT 0,
    other_tax_name VARCHAR(100) DEFAULT '-',
    other_tax_account_id INT,
    other_tax_refund_account_id INT,
    tax_product_code_id INT,
    tax_uom_id INT,
    open_price BOOLEAN DEFAULT FALSE,
    including_tax BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    estimated_time_in_minutes INT,
    open_estimated_time BOOLEAN DEFAULT FALSE,
    creator_id INT,
    updater_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE ServiceProductTagsMapping (
    service_product_tag_id INT,
    service_product_id INT REFERENCES ServiceProduct(id),
    name VARCHAR(100),
    description TEXT,
    active BOOLEAN
);

-- Seed Data for Tax Unit of Measures (39 entries)
-- Example: INSERT INTO TaxUnitOfMeasure (code, description) VALUES ('UM.0001', 'Metrik Ton'), ...;