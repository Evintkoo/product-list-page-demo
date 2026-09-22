/**
 * Orchestrates the retrieval of account data for the API.
 */
function getAccountList(userContext, queryParams) {
  const limit = queryParams.limit ?? 100;
  const offset = queryParams.offset ?? 0;
  
  // Validate pagination bounds
  if (limit < 0 || offset < 0) {
    throw new ValidationError("Invalid pagination parameters");
  }

  return AccountRepository.findAccountsForDropdown(
    userContext.companyId,
    {
      search: queryParams.search,
      accountType: queryParams.account_type,
      limit: limit,
      offset: offset
    }
  );
}