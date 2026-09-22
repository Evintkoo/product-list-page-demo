/**
 * Defines the structure for the wholesale customer creation request.
 * Maps to the Customer and Address entities.
 */
interface CustomerCreateRequest {
  name: string;
  email: string;
  type: "wholesale";
  tax_id: string;
  addresses: Array<{
    street: string;
    city: string;
    postal_code: string;
    country: string;
  }>;
}

/**
 * Defines the structure for the successful creation response.
 */
interface CustomerCreateResponse {
  id: uuid;
  status: "success";
  message: string;
}

/**
 * Handles the API communication for creating a new wholesale customer.
 * 
 * @param payload - The collected form data from the UI
 * @returns Promise<CustomerCreateResponse>
 */
async function createWholesaleCustomer(payload: CustomerCreateRequest): Promise<CustomerCreateResponse> {
  const response = await fetch('/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create wholesale customer");
  }

  return await response.json();
}