/**
 * Retrieves a filtered list of Chart of Accounts records.
 * Scoped to the authenticated user's company.
 */
function findAccountsForDropdown(
  companyId: UUID,
  filters: {
    search?: string,
    accountType?: string,
    limit: number,
    offset: number
  }
) {
  // Query logic:
  // 1. SELECT * FROM Account
  // 2. WHERE company_id = companyId
  // 3. AND is_active = true
  // 4. AND is_postable = true
  
  // Apply optional filters:
  // IF filters.search:
  //    WHERE (code ILIKE %search% OR name ILIKE %search%)
  // IF filters.accountType:
  //    WHERE account_type = filters.accountType
  
  // Apply pagination:
  // LIMIT filters.limit
  // OFFSET filters.offset
  
  return database.execute(query);
}