/**
 * API Controller for GET /api/accounts
 */
async function handleGetAccounts(request) {
  const companyId = request.user.company_id;
  const { search, account_type } = request.query;

  // Fetch raw data
  const rawAccounts = await getAccountsForDropdown(companyId, { search, account_type });

  // Transform to JSON Schema
  const response = formatAccountDropdownResponse(rawAccounts);

  return {
    status: 200,
    body: response
  };
}