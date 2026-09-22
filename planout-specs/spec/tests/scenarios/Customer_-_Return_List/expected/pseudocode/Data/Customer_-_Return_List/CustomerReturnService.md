/**
 * Fetches the list of returns associated with a specific customer.
 * Endpoint: GET /api/customers/:id/returns
 */
async function getCustomerReturns(customerId: string): Promise<CustomerReturn[]> {
  const response = await fetch(`/api/customers/${customerId}/returns`);

  if (response.status === 404) {
    throw new Error("CUSTOMER_NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error("FAILED_TO_FETCH_RETURNS");
  }

  const data = await response.json();
  
  // Returns an array of CustomerReturn objects matching the schema
  return data.map((item: any) => ({
    id: item.id,
    document_number: item.document_number,
    created_at: item.created_at,
    status: item.status,
    amount: item.amount,
    store_name: item.store_name,
    created_by: item.created_by
  }));
}