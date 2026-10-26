// 1. Product Type Table (d778a535-5d66-4563-9c0a-1e4b32986a28)
CREATE TABLE ProductType (
    productTypeID INTEGER PRIMARY KEY,
    productTypeName STRING UNIQUE NOT NULL,
    productTypeDesc STRING,
    updated_at TIMESTAMP
);
// Notes covered: productTypeID is integer/unique/primary, productTypeName is string/unique/required, productTypeDesc is string, updated_at is timestamp.

// 2. Store Stock History Table (9fd119dd-0f32-4938-8453-8a87cd39f7e0)
CREATE TABLE StoreStockHistory (
    id UUID PRIMARY KEY,
    store_stock_id STRING REFERENCES StoreStocks(id),
    increased_qty INTEGER,
    decreased_qty INTEGER,
    created_at DATE,
    type ENUM('SALE', 'FPO', 'SWO'),
    notes STRING
);
// Notes covered: id is uuid/primary, store_stock_id references StoreStocks, increased_qty/decreased_qty are integers, created_at is date, type is enum (SALE, FPO, SWO), notes is string.

// 3. Store Stocks Table (e2af92bc-b10a-40b5-92b7-7abf2cb80aa5)
CREATE TABLE StoreStocks (
    id UUID PRIMARY KEY,
    product_id INTEGER REFERENCES Products(productID),
    store_id INTEGER REFERENCES Store(store_id),
    quantity NUMBER,
    updated_at DATE
);
// Notes covered: id is uuid/primary, product_id references Products, store_id references Store, quantity is number, updated_at is date.

// 4. Store Table (caecdf88-0056-4d7b-bc70-c49da469a2b1)
CREATE TABLE Store (
    store_id INTEGER PRIMARY KEY,
    store_name TEXT
);
// Notes covered: store_id is integer/unique, store_name is text.

// 5. Product History Table (17fcb585-99ba-4459-a9ba-a306fe3f6488)
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
// Notes covered: history_id is incremental/primary, product_id references Products, updated_at is datetime, updated_by is string, prices/trade-in/warranty are numbers, flags are booleans.

// 6. Prices Tracking Table (3e86d945-eb5d-4c69-b50d-2e054c582aed)
CREATE TABLE PricesTracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku STRING REFERENCES Products(SKU),
    product_id INTEGER REFERENCES Products(productID),
    price NUMBER,
    price_2 NUMBER,
    price_type ENUM(1, 2, 3),
    tracking_type ENUM('Region', 'Store', 'Warehouse', 'CustomerGroup'),
    tracking_id INTEGER,
    tracking_name STRING,
    updated_at DATE,
    created_at DATE
);
// Notes covered: id is incremental/primary, sku/product_id references Products, prices are numbers, price_type/tracking_type are enums, tracking_id/name are scope fields, dates are included.

// 7. Product Brand Table (eee47539-be72-4be6-a53c-fa77e2f3ff76)
CREATE TABLE ProductBrand (
    productBrandID INTEGER PRIMARY KEY,
    brandName STRING UNIQUE NOT NULL,
    productBrandDescription TEXT,
    updated_at DATETIME
);
// Notes covered: productBrandID is integer/primary, brandName is string/unique/required, description is text, updated_at is datetime.

// 8. Warehouse Stock Table (ca49d5bf-951e-473a-a5e6-a2544e38caf5)
CREATE TABLE WarehouseStock (
    productID INTEGER REFERENCES Products(productID),
    productName TEXT,
    warehouseID NUMBER REFERENCES Warehouse(id),
    warehouseName TEXT,
    inventoryQuantity NUMBER,
    reservedQuantity NUMBER,
    consignementQuantity NUMBER,
    availableQuantity NUMBER
);
// Notes covered: productID/warehouseID are references, quantities are numbers, names are text.

// 9. Warehouse Table (fb8ded44-b9b5-4939-a616-d22b8f9df3cb)
CREATE TABLE Warehouse (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING,
    warehouse_code STRING,
    active BOOLEAN,
    updated_at DATE
);
// Notes covered: id is incremental/primary, name/code are strings, active is boolean, updated_at is date.

// 10. Product Tags Mapping (5bdf2617-a322-4e82-af1f-2143db5a19aa)
CREATE TABLE ProductTagsMapping (
    productID INTEGER REFERENCES Products(productID),
    tagName STRING,
    tagDescription STRING,
    active BOOLEAN,
    updated_at TIME
);
// Notes covered: productID references Products, tag fields are strings, active is boolean, updated_at is time.

// 11. Purchase History Table (fbf5a52e-cc02-46ae-9229-a1f7026358f6)
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
// Notes covered: purchase_history_id is incremental/primary, product_id references Products, dates/quantities/prices/totals are included.

// 12. Products Table (c9ef9c0c-6699-4eac-b4b6-251b75b581bf)
CREATE TABLE Products (
    productID NUMBER PRIMARY KEY,
    SKU STRING UNIQUE NOT NULL,
    productName STRING NOT NULL,
    brand STRING REFERENCES ProductBrand(productBrandID),
    type STRING REFERENCES ProductType(productTypeID),
    isActive BOOLEAN,
    isOpenPrice BOOLEAN,
    category TEXT,
    carType STRING,
    tax ENUM('PPN', 'PPN10'),
    isStockTracked BOOLEAN DEFAULT TRUE,
    isProductFrozen BOOLEAN,
    storePricing NUMBER DEFAULT 0,
    productDescription TEXT,
    updatedAt TIME,
    createdAt TIME
);
// Notes covered: productID is incremental/primary, SKU/productName are unique/required, brand/type are references, flags/enums/pricing/dates are included.