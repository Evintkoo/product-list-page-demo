// Node: Customer Group Table (7bb073c9-4127-41ea-a92c-6f75bae4405a)
// Happy Path: Manage customer groupings.
// Validation: Unique (company_id, name).
// Side Effects: total_customer maintained by trigger.
// Notes covered: customer_group_id, name, company_id, total_customer, created_at, updated_at, Primary Key, Unique index.

<!-- SCHEMA
{
  "entities": {
    "Store": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "name", "type": "string" }
      ]
    },
    "Customer": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "store_id", "type": "uuid", "foreign_key": "Store.id" }
      ]
    }
  }
}
-->