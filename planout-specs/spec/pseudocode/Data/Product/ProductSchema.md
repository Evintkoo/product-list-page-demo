-- Core Product Tables
CREATE TABLE ProductType (productTypeID INT PRIMARY KEY, productTypeName VARCHAR(255) UNIQUE NOT NULL, productTypeDesc TEXT, updated_at DATETIME);
CREATE TABLE ProductBrand (productBrandID INT PRIMARY KEY, brandName VARCHAR(255) UNIQUE NOT NULL, productBrandDescription TEXT, updated_at DATETIME);
CREATE TABLE Products (
    productID INT PRIMARY KEY, 
    SKU VARCHAR(100) UNIQUE NOT NULL, 
    productName TEXT NOT NULL, 
    brand INT REFERENCES ProductBrand(productBrandID), 
    type INT REFERENCES ProductType(productTypeID),
    -- ... (additional fields as defined in schema)
    updatedAt DATETIME, 
    createdAt DATETIME
);