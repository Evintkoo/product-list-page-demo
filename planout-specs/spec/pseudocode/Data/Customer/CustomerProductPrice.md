// Node: Customer Product Price Table (651be9e1-4291-4814-b055-0ef6a63c6a1b)
// Happy Path: Insert/Update per-customer product price overrides.
// Validation: Unique constraint on (customer_id, product_id).
// Side Effects: updated_at trigger.
// Notes covered: customer_product_price_id, customer_id, product_id, price_ex_tax, created_at, updated_at, Primary Key, Unique index, Index on product_id.