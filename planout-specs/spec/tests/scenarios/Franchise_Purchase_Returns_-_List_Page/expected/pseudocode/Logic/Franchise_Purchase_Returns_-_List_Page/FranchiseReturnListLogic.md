/**
 * Orchestrates the loading of the Franchise Purchase Return list.
 * Handles authentication checks, data fetching with filters, and mapping.
 */
async function loadFranchiseReturnList(filters: Object, pagination: Object) {
  // 1. Verify Authentication
  const authResponse = await fetch("/api/auth/me");
  if (authResponse.status === 401) {
    redirectTo("/login");
    return;
  }

  // 2. Fetch Data
  // Construct query parameters from filters and pagination
  const queryParams = new URLSearchParams({
    ...filters,
    ...pagination
  });

  const response = await fetch(`/api/franchise-purchase-returns?${queryParams.toString()}`);
  const data = await response.json();

  // 3. Map to UI Model
  return data.map(mapReturnToTableColumns);
}

/**
 * Maps the raw FranchisePurchaseReturn entity to the table display format.
 */
function mapReturnToTableColumns(item: FranchisePurchaseReturn) {
  return {
    returnNo: item.ref_code,
    orderNo: item.source_order_ref_code,
    date: item.created_at,
    sentAt: item.sent_at,
    approvedDate: item.approved_at,
    fromStore: item.from_store_name,
    supplier: item.supplier_name,
    warehouse: item.warehouse_name,
    status: item.workflow_state,
    user: item.user_name
  };
}