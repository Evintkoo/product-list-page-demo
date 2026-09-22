/**
 * Data access layer for Chart of Accounts.
 * Handles filtering, scoping, and retrieval for the dropdown API.
 */
function getAccountsForDropdown(companyId: UUID, filters: { search?: string, account_type?: string }) {
  // 1. Base Query: Select from ChartOfAccount
  // 2. Scope: WHERE company_id = companyId
  // 3. Business Rules: 
  //    - WHERE active = true
  //    - WHERE is_posting_account = true
  
  // 4. Apply Optional Filters:
  //    IF search: 
  //      WHERE (account_code LIKE %search% OR account_name LIKE %search%)
  //    IF account_type: 
  //      WHERE account_type = account_type
  
  // 5. Sorting:
  //    ORDER BY account_code ASC
  
  // 6. Return projection:
  //    SELECT id AS account_id, account_code, account_name, account_type, active
  return database.query(queryBuilder);
}