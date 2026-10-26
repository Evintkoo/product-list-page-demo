// 1. Claim Table (5a3548a4-2d4b-4b0e-82dc-c2725fa5dd54)
// Receives: None. Hands to: Customer Table (via customer_id).
// Happy Path: Insert claim record with unique document_number.
// Validation: document_number must be unique; FKs must exist.
// Side Effects: Triggers update updated_at.
// Notes covered: claim_id, document_number, customer_id, vehicle_id, sale_id, status, store_id, served_by_user_id, created_at, updated_at, PK, Unique, Indexes, Composite index, Joins.

// 2. Membership Provider Table (f87e641a-34f3-4260-a00f-de9bad58178f)
// Receives: None. Hands to: Customer Table (via company_id).
// Happy Path: Define membership program.
// Validation: code must be unique; name is required.
// Side Effects: Triggers update updated_at.
// Notes covered: membership_provider_id, name, code, default_expiry_days, expiry_type, auto_generate_code, active, company_id, created_at, updated_at, PK, Unique, Index.

// 3. Customer Membership Table (38e84775-73f1-426c-9bb7-ed2f531eb7da)
// Receives: None. Hands to: Customer Table (via customer_id).
// Happy Path: Link customer to membership program.
// Validation: Unique (customer_id, membership_provider_id).
// Side Effects: Triggers update updated_at.
// Notes covered: customer_membership_id, customer_id, membership_provider_id, membership_code, points, beginning_point, expiry_date, store_id, is_active, created_at, updated_at, PK, Unique, Composite index, Index.

// 4. Deposit Transaction Table (82f353f7-463c-4777-948b-4b4824abdb15)
// Receives: None. Hands to: Deposit Table (via deposit_id).
// Happy Path: Record deposit movement.
// Validation: amount positive/negative.
// Side Effects: Triggers update updated_at; potential partition.
// Notes covered: deposit_transaction_id, deposit_id, coa_id, transaction_date, amount, notes, created_at, updated_at, PK, Composite index, Index, Partitioning.

// 5. Deposit Table (6aacc51c-6583-4109-8f01-0372f23902d6)
// Receives: Deposit Transaction Table. Hands to: Customer Table (via customer_id).
// Happy Path: Maintain customer deposit balance.
// Validation: Unique customer_id.
// Side Effects: Denormalized balance updated by trigger from Deposit Transaction.
// Notes covered: deposit_id, customer_id, account_name, coa_id, balance, last_deposit_received, last_deposit_used, created_at, updated_at, PK, Unique, Index.

// 6. Vehicle Model Table (e0274cea-05c5-4397-b864-249bb0b2e8c6)
// Receives: None. Hands to: Vehicle Table (via vehicle_make_id).
// Happy Path: Define vehicle model.
// Validation: Unique (vehicle_make_id, name).
// Side Effects: Triggers update updated_at.
// Notes covered: vehicle_model_id, vehicle_make_id, name, active, created_at, updated_at, PK, Unique, Index.

// 7. Vehicle Table (66154162-49aa-40e7-bf0c-ab8bd2d3a0f1)
// Receives: Vehicle Model Table. Hands to: Customer Table (via customer_id), Vehicle Make Table (via vehicle_make_id).
// Happy Path: Register vehicle to customer.
// Validation: Required fields (type, make, model, color).
// Side Effects: Triggers update updated_at.
// Notes covered: vehicle_id, customer_id, vehicle_type, registration_no, hull_number, vin, fin, vehicle_make_id, vehicle_model_id, year, color, odometer, hour_meter, engine_number, engine_capacity_cc, transmission_type, registration_date, service_contract, store_id, created_at, updated_at, PK, Search indexes, Composite index.

// 8. Vehicle Make Table (41db7bf7-8f3b-48e1-ba25-2e632642f9e5)
// Receives: Vehicle Table. Hands to: None.
// Happy Path: Define vehicle brand.
// Validation: Unique name.
// Side Effects: Triggers update updated_at.
// Notes covered: vehicle_make_id, name, vehicle_category, active, created_at, updated_at, PK, Unique.

// 9. Customer Product Price Table (651be9e1-4291-4814-b055-0ef6a63c6a1b)
// Receives: None. Hands to: Customer Table (via customer_id).
// Happy Path: Set custom price for customer.
// Validation: Unique (customer_id, product_id).
// Side Effects: Triggers update updated_at.
// Notes covered: customer_product_price_id, customer_id, product_id, price_ex_tax, created_at, updated_at, PK, Unique, Index.

// 10. Customer Billing Table (b7bc6491-86a1-4940-ba74-c6b3fa67cd16)
// Receives: None. Hands to: Customer Table (via customer_id).
// Happy Path: Store billing profile.
// Validation: None.
// Side Effects: Triggers update updated_at.
// Notes covered: customer_billing_id, customer_id, billing_company_name, billing_address_1, billing_address_2, billing_phone, billing_city, created_at, updated_at, PK, Index, Trigram GIN.

// 11. Customer Table (819366ae-0e25-4f34-b7d7-d6900c4d8ba0)
// Receives: All previous tables. Hands to: Customer Group Table (via customer_group_id).
// Happy Path: Manage customer master data.
// Validation: Unique (company_id, customer_code) partial; type discriminators.
// Side Effects: Triggers update updated_at; sanitized_phone generated.
// Notes covered: customer_id, customer_code, name, is_active, is_wholesale, is_franchise, is_consignment, store_id, company_id, customer_group_id, salesperson_id, address, customer_region, phone, sanitized_phone, email, birthdate, notes, tax_no, tax_id, pricelist_id, coa_id_account_receivable, customer_settings, creator_id, updater_id, created_at, updated_at, PK, Unique, Composite index, Search indexes, Keyset pagination.

// 12. Customer Group Table (7bb073c9-4127-41ea-a92c-6f75bae4405a)
// Receives: Customer Table. Hands to: Customer Table (via company_id).
// Happy Path: Group customers.
// Validation: Unique (company_id, name).
// Side Effects: total_customer maintained by trigger.
// Notes covered: customer_group_id, name, company_id, total_customer, created_at, updated_at, PK, Unique.

<!-- SCHEMA
{
  "entities": {
    "Customer": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "name", "type": "string" },
        { "name": "email", "type": "string", "unique": true },
        { "name": "phone", "type": "string" },
        { "name": "store_id", "type": "uuid", "foreign_key": "Store.id" },
        { "name": "created_at", "type": "datetime" }
      ]
    },
    "Store": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "name", "type": "string" }
      ]
    }
  }
}
-->