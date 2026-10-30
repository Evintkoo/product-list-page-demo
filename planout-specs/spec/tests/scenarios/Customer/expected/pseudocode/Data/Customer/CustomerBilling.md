// Node: Customer Billing Table (b7bc6491-86a1-4940-ba74-c6b3fa67cd16)
// Happy Path: Store billing profiles for customers.
// Validation: customer_id FK.
// Side Effects: updated_at trigger, trigram GIN index on billing_company_name.
// Notes covered: customer_billing_id, customer_id, billing_company_name, billing_address_1, billing_address_2, billing_phone, billing_city, created_at, updated_at, Primary Key, Index on customer_id, Trigram GIN index.