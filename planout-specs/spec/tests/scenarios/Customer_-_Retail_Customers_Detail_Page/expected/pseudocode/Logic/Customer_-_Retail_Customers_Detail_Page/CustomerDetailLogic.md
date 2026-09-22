/**
 * Logic to handle the retrieval and mapping of Retail Customer details.
 */

export const fetchRetailCustomerDetail = async (customerId: string) => {
  try {
    // Trigger GET /api/customers/:id
    const response = await apiClient.get(`/api/customers/${customerId}`);
    
    if (response.status === 200) {
      return mapCustomerDataToUI(response.data);
    }
  } catch (error) {
    if (error.status === 404) {
      handleNotFoundError();
    } else {
      handleGenericError(error);
    }
  }
};

/**
 * Mapping logic to transform API response into UI-ready structures
 */
const mapCustomerDataToUI = (data: any) => {
  return {
    detailsCard: {
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
      notes: data.notes
    },
    groupCard: {
      customer_group: data.customer_group
    },
    taxCard: {
      tax_no: data.tax_no,
      nppkp: data.nppkp,
      nitku: data.nitku,
      tax_id: data.tax_id
    },
    sapCard: {
      sap_assignment: data.sap_assignment,
      sap_profit_center: data.sap_profit_center,
      sap_cost_center: data.sap_cost_center
    },
    settingsCard: {
      customer_settings: data.customer_settings,
      pricelist_id: data.pricelist_id,
      coa_id_account_receivable: data.coa_id_account_receivable
    },
    addressesCard: data.addresses.map((addr: any) => ({
      address_type: addr.address_type,
      address: addr.address,
      phone_1: addr.phone_1,
      phone_2: addr.phone_2,
      fax: addr.fax,
      is_main_address: addr.is_main_address,
      is_shipping_address: addr.is_shipping_address
    })),
    changesCard: {
      created_at: data.created_at,
      creator_id: data.creator_id,
      updated_at: data.updated_at,
      updater_id: data.updater_id
    }
  };
};