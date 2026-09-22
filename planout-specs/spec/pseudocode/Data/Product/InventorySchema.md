-- Inventory and Stock Tracking
CREATE TABLE StoreStocks (id UUID PRIMARY KEY, product_id INT REFERENCES Products(productID), store_id INT, quantity NUMERIC, updated_at DATETIME);
CREATE TABLE StoreStockHistory (id UUID PRIMARY KEY, store_stock_id UUID REFERENCES StoreStocks(id), product_id INT REFERENCES Products(productID), type VARCHAR(50), created_at DATETIME);
CREATE TABLE WarehouseStock (productID INT REFERENCES Products(productID), warehouseID INT, inventoryQuantity NUMERIC, average_cost NUMERIC(18,2));
CREATE TABLE WarehouseStockHistory (id SERIAL PRIMARY KEY, warehouseId INT, productId INT, type VARCHAR(50), quantityChanged NUMERIC, createdAt DATETIME);