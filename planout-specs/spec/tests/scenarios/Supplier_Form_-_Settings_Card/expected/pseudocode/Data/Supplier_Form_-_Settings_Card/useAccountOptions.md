// Hook to fetch and format data for the Settings Card dropdowns
FUNCTION useAccountOptions():
  // Fetch raw data from the API
  response = GET /api/accounts
  
  // Transform data for UI consumption
  // Each option displays: account_code + " - " + account_name
  // Each option stores: account_id
  formattedOptions = response.map(account => ({
    label: account.account_code + " - " + account.account_name,
    value: account.account_id
  }))
  
  RETURN formattedOptions