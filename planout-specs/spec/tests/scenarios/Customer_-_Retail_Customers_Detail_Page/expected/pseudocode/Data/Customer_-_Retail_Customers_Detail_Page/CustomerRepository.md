/**
 * Fetches a single retail customer by ID including associated addresses.
 * Used by the GET /api/customers/:id endpoint.
 */
function getRetailCustomerById(id: UUID): RetailCustomerDetailResponse {
  const customer = db.RetailCustomer.findUnique({
    where: { id },
    include: {
      addresses: true
    }
  });

  if (!customer) {
    throw new NotFoundError("Retail Customer not found");
  }

  return mapToRetailCustomerDetailResponse(customer);
}

/**
 * Maps database entity to the API response structure.
 */
function mapToRetailCustomerDetailResponse(data: RetailCustomer): RetailCustomerDetailResponse {
  return {
    id: data.id,
    customer_code: data.customer_code,
    name: data.name,
    phone: data.phone,
    customer_region: data.customer_region,
    identity_number: data.identity_number,
    occupation: data.occupation,
    customer_wholesale_name: data.customer_wholesale_name,
    email: data.email,
    gender: data.gender,
    birthdate: data.birthdate,
    store_name: data.store_name,
    salesperson_id: data.salesperson_id,
    notes: data.notes,
    customer_group: data.customer_group,
    tax_no: data.tax_no,
    nppkp: data.nppkp,
    nitku: data.nitku,
    tax_id: data.tax_id,
    sap_assignment: data.sap_assignment,
    sap_profit_center: data.sap_profit_center,
    sap_cost_center: data.sap_cost_center,
    customer_settings: data.customer_settings,
    pricelist_id: data.pricelist_id,
    coa_id_account_receivable: data.coa_id_account_receivable,
    addresses: data.addresses.map(addr => ({
      address_type: addr.address_type,
      address: addr.address,
      phone_1: addr.phone_1,
      phone_2: addr.phone_2,
      fax: addr.fax,
      is_main_address: addr.is_main_address,
      is_shipping_address: addr.is_shipping_address
    })),
    created_at: data.created_at,
    creator_id: data.creator_id,
    updated_at: data.updated_at,
    updater_id: data.updater_id
  };
}