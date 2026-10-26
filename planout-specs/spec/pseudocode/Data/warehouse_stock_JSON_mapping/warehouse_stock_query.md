// Node: SQL Query: Warehouse Stock (7cfdaa81-9fdd-4322-9395-016f67562751)
// Input: Schema definition from "Warehouse Stock JSON Schema"
// Output: Result set to "warehouse_stock table"
// Description: Executes a retrieval of stock data from the database.
// Happy Path: Returns rows matching the schema structure.
// Validation: Query must select all 8 fields defined in the schema.
// Empty State: Returns an empty result set if no records exist in warehouse_stock.
// Side Effects: Read-only database operation.

SELECT 
    productID, 
    productName, 
    warehouseID, 
    warehouseName, 
    inventoryQuantity, 
    reservedQuantity, 
    consignementQuantity, 
    availableQuantity 
FROM warehouse_stock;

// Notes covered:
// 1. This is a sql query of warehouse stock table on the UI level.
// 2. Selects all 8 fields from warehouse_stock.