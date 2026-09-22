/* 
   Service Order Table:
   Acts as the primary header for workshop activities. 
   Computed fields (subtotal, tax, total) are managed by the application layer 
   based on line item aggregation.
*/

CREATE TABLE service_orders (
    id SERIAL PRIMARY KEY,
    ref_code VARCHAR(255) UNIQUE NOT NULL,
    reference_no VARCHAR(255),
    order_type VARCHAR(50) NOT NULL, -- direct_sale, vehicle_service, generic_service
    status VARCHAR(50) NOT NULL,     -- draft, diagnosis, approved, pending_approval, cancelled
    store_id INTEGER NOT NULL REFERENCES stores(id),
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    vehicle_id INTEGER REFERENCES vehicles(id),
    contact_person_id INTEGER,
    service_advisor_id INTEGER NOT NULL REFERENCES users(id),
    salesperson_id INTEGER NOT NULL REFERENCES users(id),
    booking_source_id INTEGER,
    service_date DATE,
    service_time VARCHAR(20),
    odometer NUMERIC,
    hour_meter NUMERIC,
    subtotal NUMERIC DEFAULT 0,
    tax_amount NUMERIC DEFAULT 0,
    other_tax_amount NUMERIC DEFAULT 0,
    rounding_amount NUMERIC DEFAULT 0,
    total NUMERIC DEFAULT 0,
    use_insurance BOOLEAN DEFAULT FALSE,
    notes TEXT,
    creator_id INTEGER NOT NULL REFERENCES users(id),
    updater_id INTEGER NOT NULL REFERENCES users(id),
    approver_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    approved_at TIMESTAMP
);

/* 
   Service Work Order Table:
   The operational document for mechanics. 
   Unique constraint enforced on (company_id, ref_code).
*/

CREATE TABLE service_work_orders (
    id SERIAL PRIMARY KEY,
    ref_code VARCHAR(255) NOT NULL,
    aasm_state VARCHAR(50) NOT NULL,
    store_id INTEGER NOT NULL REFERENCES stores(id),
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    vehicle_id INTEGER REFERENCES vehicles(id),
    service_date DATE,
    service_time VARCHAR(20),
    service_reservation_id INTEGER,
    service_order_id INTEGER REFERENCES service_orders(id),
    service_invoice_id INTEGER,
    company_id INTEGER NOT NULL,
    creator_id INTEGER NOT NULL REFERENCES users(id),
    updater_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    UNIQUE(company_id, ref_code)
);

CREATE INDEX idx_swo_state ON service_work_orders(aasm_state);
CREATE INDEX idx_swo_store ON service_work_orders(store_id);
CREATE INDEX idx_swo_date ON service_work_orders(service_date);