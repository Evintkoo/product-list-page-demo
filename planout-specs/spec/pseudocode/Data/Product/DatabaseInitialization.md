-- Initialize core lookup tables
CREATE TABLE ProductType (productTypeID INTEGER PRIMARY KEY, productTypeName VARCHAR UNIQUE NOT NULL, productTypeDesc TEXT, updated_at DATETIME);
CREATE TABLE ProductBrand (productBrandID INTEGER PRIMARY KEY, brandName VARCHAR UNIQUE NOT NULL, productBrandDescription TEXT, updated_at DATETIME);

-- Initialize main product table
CREATE TABLE Products (
    productID INTEGER PRIMARY KEY,
    SKU VARCHAR UNIQUE NOT NULL,
    productName VARCHAR NOT NULL,
    brand INTEGER REFERENCES ProductBrand(productBrandID),
    type INTEGER REFERENCES ProductType(productTypeID),
    isActive BOOLEAN,
    isOpenPrice BOOLEAN,
    category TEXT,
    carType VARCHAR,
    tax ENUM('PPN', 'PPN10'),
    isStockTracked BOOLEAN DEFAULT TRUE,
    isProductFrozen BOOLEAN,
    storePricing NUMBER DEFAULT 0,
    productDescription TEXT,
    updatedAt DATETIME,
    createdAt DATETIME
);

-- Initialize inventory and tracking
CREATE TABLE StoreStocks (id UUID PRIMARY KEY, product_id INTEGER REFERENCES Products(productID), store_id INTEGER REFERENCES Store(store_id), quantity NUMBER, updated_at DATETIME);
CREATE TABLE StoreStockHistory (id UUID PRIMARY KEY, store_stock_id UUID REFERENCES StoreStocks(id), increased_qty INTEGER, decreased_qty INTEGER, created_at DATETIME, type ENUM('SALE', 'FPO', 'SWO'), notes TEXT);
CREATE TABLE PricesTracking (id INTEGER PRIMARY KEY AUTOINCREMENT, sku VARCHAR REFERENCES Products(SKU), product_id INTEGER REFERENCES Products(productID), price NUMBER, price_2 NUMBER, price_type ENUM(1,2,3), tracking_type ENUM('Region', 'Store', 'Warehouse', 'CustomerGroup'), tracking_id INTEGER, tracking_name VARCHAR, updated_at DATETIME, created_at DATETIME);