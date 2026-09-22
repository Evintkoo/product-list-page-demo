/**
 * Handles persistence logic for Service Product Types.
 */
function createServiceProductType(data: {
  name: string,
  description?: string,
  service_advisor_id?: string,
  refund_account_id?: string,
  is_active: boolean
}) {
  // Insert new record into ServiceProductType table
  // Returns the newly created record including the generated UUID
  return db.table('ServiceProductType').insert({
    name: data.name,
    description: data.description || null,
    service_advisor_id: data.service_advisor_id || null,
    refund_account_id: data.refund_account_id || null,
    is_active: data.is_active ?? true,
    created_at: now()
  }).returning('*');
}

/**
 * Fetches the default Chart of Accounts entry for Finance-owned defaults.
 */
function getDefaultFinanceAccount() {
  // Retrieves the system-configured default account (e.g., 400.001.001)
  return db.table('ChartOfAccounts')
    .where('account_code', '400.001.001')
    .first();
}