// Node: Customer Table (819366ae-0e25-4f34-b7d7-d6900c4d8ba0)
// Happy Path: CRUD operations for customer records.
// Validation: Unique (company_id, customer_code) partial; Type discriminator (at most one of wholesale/franchise/consignment).
// Side Effects: sanitized_phone generated column, updated_at trigger, trigram GIN on name.
// Notes covered: customer_id, customer_code, name, is_active, is_wholesale, is_franchise, is_consignment, store_id, company_id, customer_group_id, salesperson_id, address, customer_region, phone, sanitized_phone, email, birthdate, notes, tax_no, tax_id, pricelist_id, coa_id_account_receivable, customer_settings, creator_id, updater_id, created_at, updated_at, Keys/Indexes, Keyset pagination.