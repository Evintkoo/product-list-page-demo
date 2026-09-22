/**
 * Logic layer to transform database records into the API response format.
 */
function formatAccountDropdownResponse(records: Array<ChartOfAccount>) {
  const data = records.map(record => ({
    account_id: record.id,
    account_code: record.account_code,
    account_name: record.account_name,
    account_type: record.account_type,
    active: record.active
  }));

  return {
    data: data
  };
}