// Unit: Product List JSON Schema (4e8de75d-a6b9-4db7-84c2-e4874cd5d282)
// Receives: None
// Hands to: Product Details JSON Schema (d7897a8a-54bf-47ea-9b07-d5b5bedaa0ff)
// Logic: Defines the structure for paginated product lists.
// Happy Path: Returns object with { products: Product[], total: int, page: int, pageSize: int }.
// Validation: 'products' and 'total' are required.
// Notes covered: List of products from products table, This schema defines the paginated product list response, $schema, title, type, properties, required.

// Unit: Product Details JSON Schema (d7897a8a-54bf-47ea-9b07-d5b5bedaa0ff)
// Receives: Product List JSON Schema (4e8de75d-a6b9-4db7-84c2-e4874cd5d282)
// Hands to: None
// Logic: Defines the full Product entity structure.
// Happy Path: Returns object with SKU, productName, brand, and optional metadata.
// Validation: SKU, productName, and brand are required.
// Notes covered: This JSON schema references the database table Products Table, properties, required, enum for tax, default values.

// Unit: Warehouse Stock JSON Schema (94465375-aa7a-44e6-90c2-75d04061e221)
// Receives: SQL Query: Warehouse Stock (40d67243-c601-45e3-9f56-c3c4e5b1b0bb)
// Hands to: None
// Logic: Defines the structure for warehouse inventory data.
// Happy Path: Returns object with productID, productName, warehouseID, warehouseName, and quantity metrics.
// Validation: All properties are required.
// Notes covered: this is a warehouse stock JSON schema, properties, required.

// Unit: Warehouse table response shape (48aec2f3-f629-43b0-8499-3d2513f10479)
// Receives: None
// Hands to: warehouse data query (03d03473-7602-4015-8951-90857a8f7eec)
// Logic: Defines the response shape for warehouse inventory tables.
// Happy Path: Returns { total_quantity: number, data: Array<WarehouseStockResponseItem> }.
// Validation: total_quantity and data are required.
// Notes covered: this is a warehouse table response shape, properties, required.

// Unit: Product Details Response Shape (4421bf48-1417-4a03-9fd0-7af95a4c32f8)
// Receives: None
// Hands to: Consolidated Product Data Query (862a65f8-c624-4520-a610-1cbb7087e56d)
// Logic: Defines the flattened response shape for consolidated product queries.
// Happy Path: Returns a single object containing product, brand, type, and warehouse stock fields.
// Notes covered: JSON representation from the consolidated query.

// Unit: Product Brand JSON Schema (d1c80e1d-1e8b-474e-9976-0e1f494a6090)
// Receives: None
// Hands to: Consolidated Product Data Query (862a65f8-c624-4520-a610-1cbb7087e56d)
// Logic: Defines the structure for product brand records.
// Happy Path: Returns object with productBrandID, brandName, productBrandDescription, updated_at.
// Notes covered: This JSON Schema refers to format of each row of from the product brand table.

// Unit: Product Type JSON Schema (e88e8222-706b-4799-9d57-5e07bcb329af)
// Receives: None
// Hands to: Consolidated Product Data Query (862a65f8-c624-4520-a610-1cbb7087e56d)
// Logic: Defines the structure for product type records.
// Happy Path: Returns object with productTypeID, productTypeName, productTypeDesc, updated_at.
// Notes covered: This JSON Schema represents each row of product type table.

// Unit: Store Stocks JSON Schema (e35a495e-aa03-4284-839a-216097df74f2)
// Receives: None
// Hands to: Consolidated Product Data Query (862a65f8-c624-4520-a610-1cbb7087e56d)
// Logic: Defines the structure for store stock records.
// Happy Path: Returns object with product_id, sku, store_id, quantity, updated_at.
// Notes covered: This table contains the list of product stock quantities per store.

// Unit: Product History Response Shape (34c95762-b78b-4c12-9a0e-356490f4287d)
// Receives: None
// Hands to: None
// Logic: Defines the structure for product history logs.
// Happy Path: Returns object with history_id, product_id, updated_at, updated_by, and pricing/status fields.
// Notes covered: unique identifier, AUTO-INCREMENT, required fields.