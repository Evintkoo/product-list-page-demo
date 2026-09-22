/**
 * Logic for handling API interactions for the Settings Card
 */

export const useSettingsActions = () => {
  const updateCustomerSettings = async (payload) => {
    // API CONTRACT: POST /customers/{id}/settings
    // Payload must contain tax_id as per requirements
    const response = await fetch(`/customers/${payload.customerId}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tax_id: payload.tax_id
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update customer settings');
    }
    return response.json();
  };

  return { updateCustomerSettings };
};