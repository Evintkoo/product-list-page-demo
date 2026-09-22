/**
 * Orchestrates the data fetching lifecycle for the Stock Transfer List page.
 */
async function loadStockTransferPage(filters, pagination) {
  // 1. Verify authentication
  const user = await fetch("/api/auth/me");
  if (!user.ok) {
    return redirectTo("/login");
  }

  // 2. Fetch filter options (Locations)
  const locations = await fetch("/api/stores");

  // 3. Fetch paginated stock transfers based on current state
  const queryParams = new URLSearchParams({
    ...filters,
    limit: pagination.limit,
    offset: pagination.offset
  });

  const response = await fetch(`/api/stock-transfers?${queryParams.toString()}`);
  const { data, pagination: meta } = await response.json();

  // 4. Map data to UI
  return {
    tableRows: data.map(mapStockTransferToRow),
    pagination: meta,
    locations: locations
  };
}

/**
 * Maps raw StockTransfer entity data to the UI table row format.
 */
function mapStockTransferToRow(item) {
  return {
    id: item.id,
    ref_code: item.ref_code,
    transfer_type: item.transfer_type,
    created_at: item.created_at,
    due_at: item.due_at,
    from_location_name: item.from_location_id, <!-- MISSING_FIELD: Location.name -->
    to_location_name: item.to_location_id,   <!-- MISSING_FIELD: Location.name -->
    workflow_state: item.workflow_state,
    user_name: item.created_by_user_id       <!-- MISSING_FIELD: User.name -->
  };
}