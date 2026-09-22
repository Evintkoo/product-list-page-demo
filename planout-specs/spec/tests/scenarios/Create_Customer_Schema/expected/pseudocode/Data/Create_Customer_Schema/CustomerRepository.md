/**
 * Executes the atomic creation of a customer and their associated addresses.
 * Uses a database transaction to ensure data integrity.
 */
async function createCustomerWithAddresses(requestData, authenticatedUserId) {
  return await db.transaction(async (tx) => {
    // 1. Map customer type to discriminator flags
    const isWholesale = requestData.type === 'wholesale';
    const isFranchise = requestData.type === 'franchise';
    const isConsignment = requestData.type === 'consignment';

    // 2. Insert into customer table
    const [customer] = await tx('customer').insert({
      customer_code: requestData.customer_code,
      name: requestData.name,
      is_active: true,
      is_wholesale: isWholesale,
      is_franchise: isFranchise,
      is_consignment: isConsignment,
      store_id: requestData.store_id,
      company_id: requestData.company_id,
      customer_group_id: requestData.customer_group_id,
      salesperson_id: requestData.salesperson_id,
      customer_region: requestData.customer_region,
      phone: requestData.phone,
      email: requestData.email,
      birthdate: requestData.birthdate,
      gender: requestData.gender,
      identity_number: requestData.identity_number,
      occupation_id: requestData.occupation_id,
      notes: requestData.notes,
      tax_no: requestData.tax_no,
      tax_id: requestData.tax_id,
      pricelist_id: requestData.pricelist_id,
      coa_id_account_receivable: requestData.coa_id_account_receivable,
      customer_settings: requestData.customer_settings || {},
      nppkp: requestData.nppkp,
      nitku: requestData.nitku,
      sap_assignment: requestData.sap_assignment,
      sap_profit_center: requestData.sap_profit_center,
      sap_cost_center: requestData.sap_cost_center,
      customer_wholesale_id: requestData.customer_wholesale_id,
      creator_id: authenticatedUserId,
      updater_id: authenticatedUserId,
      created_at: new Date(),
      updated_at: new Date()
    }).returning('*');

    const customerId = customer.customer_id;

    // 3. Process and insert addresses
    if (requestData.addresses && requestData.addresses.length > 0) {
      let mainAddressValue = null;

      for (const addr of requestData.addresses) {
        await tx('customer_address').insert({
          customer_id: customerId,
          address_type: addr.address_type,
          address: addr.address,
          phone_1: addr.phone_1,
          phone_2: addr.phone_2,
          fax: addr.fax,
          country: addr.country,
          province: addr.province,
          regency_municipality: addr.regency_municipality,
          district: addr.district,
          village: addr.village,
          postal_code: addr.postal_code,
          area_code: addr.area_code,
          is_main_address: addr.is_main_address || false,
          is_shipping_address: addr.is_shipping_address || false,
          created_at: new Date(),
          updated_at: new Date()
        });

        if (addr.is_main_address) {
          mainAddressValue = addr.address;
        }
      }

      // 4. Update primary address on customer record if main address was provided
      if (mainAddressValue) {
        await tx('customer')
          .where({ customer_id: customerId })
          .update({ address: mainAddressValue });
        customer.address = mainAddressValue;
      }
    }

    return customer;
  });
}