{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "WarehouseStockHistory",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "warehouseId": { "type": "integer" },
    "productId": { "type": "integer" },
    "type": { 
      "type": "string", 
      "enum": ["Stock Order", "Purchase Delivery", "Sales Delivery", "Balance Import"] 
    },
    "referenceCode": { "type": "string" },
    "quantityChanged": { "type": "integer" },
    "notes": { "type": "string" },
    "createdBy": { "type": "string" },
    "createdAt": { "type": "string", "format": "date-time" }
  },
  "required": ["id", "warehouseId", "productId", "type", "quantityChanged", "createdAt"]
}