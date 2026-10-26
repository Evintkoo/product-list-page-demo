// Unit: SQL Query: Warehouse Stock by ProductID (0be773d7-de38-43ec-9ec6-030ff8e08c3e)
// Receives: None
// Hands to: SQL Query: Warehouse Stock (40d67243-c601-45e3-9f56-c3c4e5b1b0bb)
// Logic: Fetches warehouse stock for a specific productID.
// Side Effects: Executes SELECT query on warehouse_stock table.

// Unit: SQL Query: Warehouse Stock (40d67243-c601-45e3-9f56-c3c4e5b1b0bb)
// Receives: SQL Query: Warehouse Stock by ProductID (0be773d7-de38-43ec-9ec6-030ff8e08c3e)
// Hands to: Warehouse Stock JSON Schema (94465375-aa7a-44e6-90c2-75d04061e221)
// Logic: Fetches all warehouse stock records.
// Side Effects: Executes SELECT query on warehouse_stock table.

// Unit: warehouse data query (03d03473-7602-4015-8951-90857a8f7eec)
// Receives: Warehouse table response shape (48aec2f3-f629-43b0-8499-3d2513f10479)
// Hands to: Consolidated Product Data Query (862a65f8-c624-4520-a610-1cbb7087e56d)
// Logic: Complex join query fetching warehouse stock, reservations, and in-transit documents.
// Params: product_id, company_id, warehouse_id, name, warehouse_code, LIMIT, OFFSET.
// Side Effects: Executes complex JOIN/LATERAL query.

// Unit: Consolidated Product Data Query (862a65f8-c624-4520-a610-1cbb7087e56d)
// Receives: Product Details Response Shape (4421bf48-1417-4a03-9fd0-7af95a4c32f8)
// Hands to: None
// Logic: Merges store stock, product tags, warehouse inventory, brand, and type into one result set.
// Side Effects: Executes JOIN query with GROUP BY and pagination.

// Unit: Product History Data Query (d3f31be0-d1e2-44db-aec4-176b538d4f5b)
// Receives: None
// Hands to: None
// Logic: Fetches history records for a specific product.
// Side Effects: Executes SELECT query on product_history table ordered by updated_at DESC.

<!-- SCHEMA
{
  "entities": {
    "Product": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "name", "type": "string" },
        { "name": "brand_id", "type": "uuid", "foreign_key": "Brand.id" },
        { "name": "type_id", "type": "uuid", "foreign_key": "ProductType.id" },
        { "name": "status", "type": "string" }
      ]
    },
    "Warehouse": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "name", "type": "string" },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.id" },
        { "name": "stock_level", "type": "integer" }
      ]
    },
    "Brand": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "name", "type": "string" }
      ]
    },
    "ProductType": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "label", "type": "string" }
      ]
    },
    "StoreStocks": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "store_id", "type": "uuid" },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.id" },
        { "name": "quantity", "type": "integer" }
      ]
    }
  }
}
-->