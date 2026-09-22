/**
 * Fetches the list of returns associated with a specific customer.
 * @param customerId - The UUID of the customer.
 */
async function fetchCustomerReturns(customerId: string) {
  try {
    const response = await fetch(`/api/customers/${customerId}/returns`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status === 404) {
      throw new Error("Customer not found");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch return list");
    }

    const data = await response.json();
    return data.map(mapReturnToViewModel);
  } catch (error) {
    console.error("Error loading customer returns:", error);
    throw error;
  }
}

/**
 * Maps raw CustomerReturn entity data to the UI-friendly format.
 */
function mapReturnToViewModel(item: any) {
  return {
    documentNumber: item.document_number,
    createdAt: item.created_at,
    status: item.status,
    amount: item.amount,
    storeName: item.store_name,
    createdBy: item.created_by
  };
}