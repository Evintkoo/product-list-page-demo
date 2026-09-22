/**
 * Fetches the list of retail customers based on search criteria and filters.
 * @param filters Object containing search, group, region, and pagination parameters.
 */
async function fetchRetailCustomers(filters: {
  search?: string,
  customer_group?: string,
  customer_region?: string,
  page?: number
}) {
  const queryParams = new URLSearchParams({
    type: 'retail',
    ...(filters.search && { search: filters.search }),
    ...(filters.customer_group && { customer_group: filters.customer_group }),
    ...(filters.customer_region && { customer_region: filters.customer_region }),
    ...(filters.page && { page: filters.page.toString() })
  });

  const response = await fetch(`/api/customers?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch retail customers");
  }

  return await response.json();
}