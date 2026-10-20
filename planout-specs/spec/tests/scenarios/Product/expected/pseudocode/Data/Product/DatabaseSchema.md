/* 
   The Data Layer defines the core Product entity and its surrounding ecosystem.
   Relationships are enforced via foreign keys linking to the Products Table.
   Stock tracking is split between Store-level and Warehouse-level entities.
*/

// Core Product Definition
CREATE TABLE Products (
    productID INTEGER PRIMARY KEY AUTOINCREMENT,
    SKU STRING UNIQUE NOT NULL,
    productName STRING NOT NULL,
    brand INTEGER REFERENCES ProductBrand(productBrandID),
    type INTEGER REFERENCES ProductType(productTypeID),
    isActive BOOLEAN,
    isOpenPrice BOOLEAN,
    category TEXT,
    carType TEXT,
    tax ENUM('PPN', 'PPN10'),
    isStockTracked BOOLEAN DEFAULT TRUE,
    isProductFrozen BOOLEAN,
    storePricing NUMBER DEFAULT 0,
    productDescription TEXT,
    updatedAt DATETIME,
    createdAt DATETIME
);

// Stock Management
CREATE TABLE StoreStocks (
    id UUID PRIMARY KEY,
    product_id INTEGER REFERENCES Products(productID),
    store_id INTEGER REFERENCES Store(store_id),
    quantity NUMBER,
    updated_at DATETIME
);

CREATE TABLE StoreStockHistory (
    id UUID PRIMARY KEY,
    store_stock_id UUID REFERENCES StoreStocks(id),
    increased_qty INTEGER,
    decreased_qty INTEGER,
    created_at DATETIME,
    type ENUM('SALE', 'FPO', 'SWO'),
    notes STRING
);

// Pricing and History
CREATE TABLE ProductHistory (
    history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER REFERENCES Products(productID),
    updated_at DATETIME,
    updated_by STRING,
    company_supply_price NUMBER,
    wholesale_price NUMBER,
    supply_price NUMBER,
    retail_price NUMBER,
    trade_in NUMBER,
    warranty NUMBER,
    is_active BOOLEAN,
    is_tracked BOOLEAN,
    is_bundle BOOLEAN
);

CREATE TABLE PricesTracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku STRING REFERENCES Products(SKU),
    product_id INTEGER REFERENCES Products(productID),
    price NUMBER,
    price_2 NUMBER,
    price_type INTEGER,
    tracking_type INTEGER,
    tracking_id INTEGER,
    tracking_name STRING,
    updated_at DATETIME,
    created_at DATETIME
);

// Metadata and Mapping
CREATE TABLE ProductTagsMapping (
    productID INTEGER REFERENCES Products(productID),
    tagName STRING,
    tagDescription STRING,
    active BOOLEAN,
    updated_at DATETIME
);

CREATE TABLE PurchaseHistory (
    purchase_history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER REFERENCES Products(productID),
    purchase_date DATETIME,
    supplier_id INTEGER,
    purchase_delivery_id INTEGER,
    quantity NUMBER,
    unit_price NUMBER,
    subtotal NUMBER,
    tax NUMBER,
    total NUMBER
);