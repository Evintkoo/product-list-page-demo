// Unit: Purchase History JSON Schema (52cf92d3-5dcf-443f-9779-b37f15252f68)
// Description: Defines the structure for a single row in the purchase history table.
// Inputs: None (Root definition).
// Outputs: Provides schema definition to the Purchase History Table (742f13d7-fa5f-4489-b1ce-8638c13d5c22).

{
  "type": "object",
  "required": [
    "purchase_history_id", 
    "product_id", 
    "purchase_date", 
    "supplier_id", 
    "purchase_delivery_id", 
    "quantity", 
    "unit_price", 
    "subtotal", 
    "tax", 
    "total"
  ],
  "properties": {
    "purchase_history_id": { "type": "integer", "description": "unique identifier for the purchase history entry" },
    "product_id": { "type": "integer", "description": "identifier of the related product" },
    "purchase_date": { "type": "string", "format": "date-time", "description": "date and time when the purchase was recorded" },
    "supplier_id": { "type": "integer", "description": "identifier of the related supplier" },
    "purchase_delivery_id": { "type": "integer", "description": "identifier of the related purchase delivery" },
    "quantity": { "type": "number", "description": "quantity of the product purchased" },
    "unit_price": { "type": "number", "description": "price per unit of the product at purchase time" },
    "subtotal": { "type": "number", "description": "amount before tax (quantity multiplied by unit_price)" },
    "tax": { "type": "number", "description": "tax amount charged on the transaction" },
    "total": { "type": "number", "description": "final amount including tax (subtotal plus tax)" }
  }
}

// Happy Path: Validates incoming data against the required fields and types.
// Validation/Error: Rejects objects missing any required fields or containing incorrect data types.
// Empty States: Not applicable (Schema definition).
// Side Effects: None.
// Notes covered: JSON Schema structure, purchase_history_id, product_id, purchase_date, supplier_id, purchase_delivery_id, quantity, unit_price, subtotal, tax, total, required fields list.