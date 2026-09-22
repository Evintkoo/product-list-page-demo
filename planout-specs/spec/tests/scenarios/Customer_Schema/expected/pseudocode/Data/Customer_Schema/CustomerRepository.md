/**
 * Creates a new customer record.
 * Maps 'type' to discriminator flags:
 * - retail: all false
 * - wholesale: is_wholesale = true
 * - franchise: is_franchise = true
 * - consignment: is_consignment = true
 */
function createCustomer(data: CustomerCreateRequest, userId: UUID) {
  const isWholesale = data.type === 'wholesale';
  const isFranchise = data.type === 'franchise';
  const isConsignment = data.type === 'consignment';

  return db.query(`
    INSERT INTO customer (
      customer_code, name, is_active, is_wholesale, is_franchise, is_consignment,
      store_id, company_id, customer_group_id, salesperson_id, address, 
      customer_region, phone, email, birthdate, gender, identity_number, 
      occupation, notes, tax_no, tax_id, pricelist_id, coa_id_account_receivable, 
      customer_settings, nppkp, nitku, sap_assignment, sap_profit_center, 
      sap_cost_center, creator_id, updater_id, created_at, updated_at
    ) VALUES (
      $1, $2, TRUE, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 
      $16, $17, $18, $19, $20, $21, $22, COALESCE($23, '{}'::jsonb), $24, $25, 
      $26, $27, $28, $29, $29, NOW(), NOW()
    ) RETURNING *`,
    [
      data.customer_code, data.name, isWholesale, isFranchise, isConsignment,
      data.store_id, data.company_id, data.customer_group_id, data.salesperson_id,
      data.address, data.customer_region, data.phone, data.email, data.birthdate,
      data.gender, data.identity_number, data.occupation, data.notes, data.tax_no,
      data.tax_id, data.pricelist_id, data.coa_id_account_receivable, 
      data.customer_settings, data.nppkp, data.nitku, data.sap_assignment, 
      data.sap_profit_center, data.sap_cost_center, userId
    ]
  );
}

/**
 * Retrieves a paginated list of customers with joined group and store names.
 * Supports filtering by type, group, code, tax, name, phone, birthdate, store, status, address.
 */
function getCustomers(filters: CustomerListFilters, pagination: Pagination) {
  return db.query(`
    SELECT c.customer_id, cg.name AS customer_group, c.customer_code, c.name, 
           c.address, c.customer_region, c.phone, c.email, c.birthdate, 
           s.store_name, c.is_active
    FROM customer c
    LEFT JOIN customer_group cg ON cg.customer_group_id = c.customer_group_id
    LEFT JOIN store s ON s.store_id = c.store_id
    WHERE ...filters...
    ORDER BY ...dynamic_sort...
    LIMIT $14 OFFSET $15`,
    [...params]
  );
}

/**
 * Updates the active status of a customer.
 */
function updateCustomerStatus(customerId: UUID, isActive: boolean, updaterId: UUID) {
  return db.query(`
    UPDATE customer 
    SET is_active = $1, updater_id = $2, updated_at = NOW()
    WHERE customer_id = $3
    RETURNING customer_id, is_active, updated_at`,
    [isActive, updaterId, customerId]
  );
}

/**
 * Retrieves purchase history for a specific customer.
 */
function getCustomerPurchases(customerId: UUID, filters: PurchaseFilters, pagination: Pagination) {
  return db.query(`
    SELECT * FROM customer_purchase 
    WHERE customer_id = $1 AND ...filters...
    ORDER BY ...sort...
    LIMIT $8 OFFSET $9`,
    [customerId, ...params]
  );
}