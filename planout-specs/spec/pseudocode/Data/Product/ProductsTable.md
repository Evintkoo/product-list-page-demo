// Node: Products Table (c9ef9c0c-6699-4eac-b4b6-251b75b581bf)
// Receives: Warehouse Stock, Store Stocks, Purchase History, Product Tags, Product History, Prices Tracking.
// Logic: Central product registry.
CREATE TABLE Products (
  productID INTEGER PRIMARY KEY AUTOINCREMENT,
  SKU VARCHAR(255) UNIQUE NOT NULL,
  productName VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL, -- Ref: ProductBrand.productBrandID
  type VARCHAR(255) NOT NULL, -- Ref: ProductType.productTypeID
  isActive BOOLEAN,
  isOpenPrice BOOLEAN,
  category TEXT,
  carType TEXT,
  tax ENUM('PPN', 'PPN10'),
  isStockTracked BOOLEAN DEFAULT TRUE,
  isProductFrozen BOOLEAN,
  storePricing DECIMAL DEFAULT 0,
  productDescription TEXT,
  updatedAt DATETIME,
  createdAt DATETIME
);
// Notes covered: 0. productID - number, 1. SKU - string, Unique/Required, 2. productName - string, Required, 3. brand - string, Required, 4. type - string, Required, 5. isActive - boolean, 6. isOpenPrice - boolean, 7. category - text, 8. carType, 9. tax - enum, 10. isStockTracked - boolean, 11. isProductFrozen - boolean, 12. storePricing - number, 13. productDescription - text, 14. updatedAt - time, 15. createdAt - time.