/**
 * Logic for loading and mapping Franchisee Customer details.
 */
export const useFranchiseeCustomerDetail = (customerId: string) => {
  
  // 1. Fetch customer data from API
  const fetchCustomer = async (id: string) => {
    const response = await fetch(`/api/customers/${id}`, { method: 'GET' });
    
    if (response.status === 404) {
      throw new Error("Customer not found");
    }
    
    if (!response.ok) {
      throw new Error("Failed to fetch customer details");
    }
    
    return await response.json();
  };

  // 2. Mapping logic to populate UI cards
  const mapCustomerToUI = (data: any) => {
    return {
      detailsCard: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        salesperson: data.salesperson_name
      },
      groupCard: {
        customerGroup: data.customer_group
      },
      changesCard: {
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        createdBy: data.created_by_name,
        updatedBy: data.updated_by_name,
        source: data.source
      },
      taxInformationCard: {
        taxId: data.tax_id,
        vatNumber: data.vat_number
      },
      settingsCard: {
        accountStatus: data.account_status,
        creditTerms: data.credit_terms
      },
      pricesCard: {
        pricelist: data.pricelist_name
      }
    };
  };

  return { fetchCustomer, mapCustomerToUI };
};