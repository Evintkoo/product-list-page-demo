// Unit: Node d508663b-070d-4551-8055-b3dee0af94b0 (Step 1)
// Description: Initialize database connection and repository context.
// Inputs: None.
// Outputs: Provides access to WarehouseStock entity.
// Logic: Establish connection to the database instance.
// Happy Path: Connection established.
// Error State: Throw ConnectionError if database is unreachable.
// Notes covered: Initialize database connection and repository context.

// Unit: Node 946a717d-e5ab-460b-99e6-643d81d85fd8 (Step 2)
// Description: Validate Product existence.
// Inputs: Receives product_id from Logic layer.
// Outputs: Returns boolean existence check to Logic layer.
// Logic: Query Product table where id = product_id.
// Happy Path: Product found.
// Error State: Return false if product does not exist.
// Notes covered: Validate Product existence.

// Unit: Node 15bf9173-434b-40f2-9bb8-cee9c342a150 (Step 3)
// Description: Fetch warehouse stock records.
// Inputs: Receives product_id from Logic layer.
// Outputs: Returns list of WarehouseStock records to Logic layer.
// Logic: SELECT * FROM WarehouseStock WHERE product_id = :product_id.
// Happy Path: Returns array of stock objects.
// Empty State: Returns empty array if no stocks found for product.
// Notes covered: Fetch warehouse stock records.

// Unit: Node c80fc457-babe-48f2-b3c9-798605ed28c5 (Step 4)
// Description: Join Warehouse details.
// Inputs: Receives list of WarehouseStock from previous step.
// Outputs: Returns enriched list with warehouse names to Logic layer.
// Logic: JOIN Warehouse ON WarehouseStock.warehouse_id = Warehouse.id.
// Happy Path: Returns list containing quantity and warehouse name.
// Notes covered: Join Warehouse details.

// Unit: Node 90dad8a7-1e06-4d16-aeae-609807bc7b90 (Step 6)
// Description: Format and return data.
// Inputs: Receives joined data from previous step.
// Outputs: Returns serialized JSON response to Logic layer.
// Logic: Map database rows to API response schema: { warehouse_name: string, quantity: integer }.
// Happy Path: Returns formatted list.
// Notes covered: Format and return data.