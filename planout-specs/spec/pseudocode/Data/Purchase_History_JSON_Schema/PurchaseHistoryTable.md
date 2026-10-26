// Unit: Purchase History Table (742f13d7-fa5f-4489-b1ce-8638c13d5c22)
// Description: Implementation of the purchase history table based on the provided JSON schema.
// Inputs: Receives schema definition from Purchase History JSON Schema (52cf92d3-5dcf-443f-9779-b37f15252f68).
// Outputs: None.

CREATE TABLE PURCHASE_HISTORY (
    purchase_history_id INTEGER PRIMARY KEY,
    product_id INTEGER NOT NULL,
    purchase_date DATETIME NOT NULL,
    supplier_id INTEGER NOT NULL,
    purchase_delivery_id INTEGER NOT NULL,
    quantity NUMERIC NOT NULL,
    unit_price NUMERIC NOT NULL,
    subtotal NUMERIC NOT NULL,
    tax NUMERIC NOT NULL,
    total NUMERIC NOT NULL
);

// Happy Path: Table creation succeeds with all columns mapped from the JSON schema.
// Validation/Error: Fails if database constraints are violated or schema types are incompatible.
// Empty States: Table initialized as empty.
// Side Effects: Persists the structure in the database.
// Notes covered: purchase history table connection.