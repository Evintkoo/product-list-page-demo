/**
 * Logic to handle the retrieval and mapping of Wholesale Customer details.
 */

export const fetchCustomerDetail = async (customerId: string) => {
  try {
    // Call the API to retrieve the full customer record
    const response = await fetch(`/api/customers/${customerId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status === 404) {
      throw new Error("Customer not found");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch customer details");
    }

    const data = await response.json();
    return mapCustomerData(data);
  } catch (error) {
    console.error("Error loading customer detail:", error);
    throw error;
  }
};

/**
 * Maps the raw database entity fields to the UI-friendly structure.
 */
const mapCustomerData = (data: any) => {
  return {
    details: {
      customerCode: data.customer_code,
      name: data.name,
      areaRegion: data.area_region,
      address: data.address,
      ktp: data.ktp,
      phone: data.phone,
      email: data.email,
      notes: data.notes,
      salesperson: data.salesperson,
      detailBank: data.detail_bank,
      createdAtStore: data.created_at_store,
      contactFullName: data.contact_full_name,
      contactPhone: data.contact_phone,
      contactAddress: data.contact_address,
      contactRegion: data.contact_region,
      contactCountry: data.contact_country,
      contactEmail: data.contact_email,
      contactPosition: data.contact_position,
      contactDepartment: data.contact_departement
    },
    changes: {
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      createdBy: data.created_by,
      updatedBy: data.updated_by,
      source: data.source
    },
    taxInformation: {
      npwp: data.npwp,
      nppkp: data.nppkp,
      nitku: data.nitku
    },
    settings: {
      franchiseStoreOwner: data.franchise_store_owner,
      wholesaleCustomer: data.wholesale_customer,
      isCardQrisProvider: data.is_card_qris_provider,
      isInsuranceProvider: data.is_insurance_provider,
      salesTax: data.sales_tax,
      arInvoiceAccount: data.ar_invoice_account,
      creditNoteAccount: data.credit_note_account,
      customerDownPaymentAccount: data.customer_down_payment_account,
      depositAccount: data.deposit_account,
      priceDifferenceAccount: data.price_difference_account,
      currency: data.currency,
      creditTermDays: data.credit_term_days,
      creditLimit: data.credit_limit,
      overdueLimitDays: data.overdue_limit_days
    },
    group: {
      customerGroup: data.customer_group
    },
    prices: {
      pricelist: data.pricelist
    }
  };
};