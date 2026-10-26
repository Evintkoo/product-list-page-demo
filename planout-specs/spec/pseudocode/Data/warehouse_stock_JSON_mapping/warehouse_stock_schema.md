// Node: Warehouse Stock JSON Schema (2eb67a69-b1d5-4a00-a1eb-0cec51a032a2)
// Input: None
// Output: JSON Schema definition to "SQL Query: Warehouse Stock"
// Description: Defines the structure for warehouse stock data.
// Happy Path: Returns a valid JSON object conforming to the draft-07 schema.
// Validation: All fields (productID, productName, warehouseID, warehouseName, inventoryQuantity, reservedQuantity, consignementQuantity, availableQuantity) are mandatory.
// Empty State: N/A (Schema definition).
// Side Effects: None.

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "WarehouseStock",
  "type": "object",
  "properties": {
    "productID": { "type": "string" },
    "productName": { "type": "string" },
    "warehouseID": { "type": "number" },
    "warehouseName": { "type": "string" },
    "inventoryQuantity": { "type": "number" },
    "reservedQuantity": { "type": "number" },
    "consignementQuantity": { "type": "number" },
    "availableQuantity": { "type": "number" }
  },
  "required": [
    "productID", "productName", "warehouseID", "warehouseName", 
    "inventoryQuantity", "reservedQuantity", "consignementQuantity", "availableQuantity"
  ]
}

// Notes covered: 
// 1. This is a warehouse stock JSON schema as the result of the warehouse stock SQL query.
// 2. Schema uses draft-07.
// 3. Title is WarehouseStock.
// 4. All 8 specified fields are required.