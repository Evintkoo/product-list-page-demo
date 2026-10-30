// Unit: fc851a60-6869-47df-b997-cc7c267d2481
// Receives: Product Type JSON Schema (e88e8222), Consolidated Product Data Query (862a65f8)
// Logic: Joins the product type definition with the consolidated product query result.
// Happy Path: Returns a unified object containing product attributes and type metadata.
// Error State: Returns null if the product ID is not found in the type mapping.
// Notes covered: None (Node description empty).

// Unit: e35a495e-aa03-4284-839a-216097df74f2
// Receives: N/A
// Logic: Defines the schema for StoreStocks.
// Happy Path: Validates that product_id, sku, store_id, quantity, and updated_at are present.
// Error State: Throws validation error if required fields are missing.
// Notes covered: Table contains list of product stock quantities per store; JSON mapping to StoreStocks Table; Fields: product_id (int, ref Products), sku (string, ref Products), store_id (int, ref Stores), quantity (number), updated_at (date); Required: product_id, sku, store_id, quantity, updated_at.

// Unit: f9678e3d-5552-4213-a176-a9b2318e54df
// Receives: Consolidated Product Data Query (862a65f8), Store Stocks JSON Schema (e35a495e)
// Logic: Aggregates store-specific stock data into the consolidated product view.
// Happy Path: Returns the product record with an embedded array of stock objects.
// Error State: Returns empty array for stocks if no records exist for the product.
// Notes covered: None (Node description empty).

// Unit: 34c95762-b78b-4c12-9a0e-356490f4287d
// Receives: N/A
// Logic: Defines the response shape for product history entries.
// Happy Path: Returns object with history_id, product_id, updated_at, updated_by, and optional pricing/status fields.
// Error State: N/A (Schema definition).
// Notes covered: history_id (int, auto-increment, PK); product_id (int, ref Products); updated_at (datetime); updated_by (string); company_supply_price, wholesale_price, supply_price, retail_price (number); is_taxed (bool); trade_in, warranty (number); is_active, is_tracked, is_bundle (bool); Required: history_id, product_id, updated_at, updated_by.