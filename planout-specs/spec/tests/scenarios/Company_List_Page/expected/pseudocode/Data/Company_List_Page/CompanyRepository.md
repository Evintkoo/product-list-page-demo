/**
 * Data access layer for the Company entity.
 * Responsible for fetching the raw dataset from the Lumi ERP backend.
 */

interface CompanyResponse {
  Name: string;
  Address: string;
  Country: string;
  Currency: string;
  id: string;
}

/**
 * Fetches the list of all companies registered in the system.
 * Maps the raw API response to the internal Company entity schema.
 */
async function fetchAllCompanies(): Promise<Company[]> {
  const response = await apiClient.get<CompanyResponse[]>('/api/v1/companies');
  
  return response.data.map((item) => ({
    id: item.id,
    name: item.Name,
    address: item.Address,
    country: item.Country,
    currency: item.Currency
  }));
}

/**
 * Data transformation logic ensures that the UI receives a consistent 
 * object structure regardless of the underlying API response casing.
 */