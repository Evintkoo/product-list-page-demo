-- Pricing and Audit
CREATE TABLE PricesTracking (id SERIAL PRIMARY KEY, sku VARCHAR(100), product_id INT REFERENCES Products(productID), price NUMERIC, tracking_type INT);
CREATE TABLE ProductHistory (history_id SERIAL PRIMARY KEY, product_id INT REFERENCES Products(productID), updated_at DATETIME, updated_by VARCHAR(255));
CREATE TABLE PurchaseHistory (purchase_history_id SERIAL PRIMARY KEY, product_id INT REFERENCES Products(productID), purchase_date DATETIME, total NUMERIC);