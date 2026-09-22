/**
 * Handles the initialization of the Purchase Return list view.
 * Orchestrates authentication checks and data fetching.
 */
async function onPageLoad() {
  // 1. Verify user session
  const userSession = await fetch("/api/auth/me");
  
  if (userSession.status === 401) {
    redirectTo("/login");
    return;
  }

  // 2. Fetch initial list of Purchase Returns
  // Default filters are empty as per requirements
  const purchaseReturns = await fetchPurchaseReturns({});
  
  // 3. Render the list to the UI
  renderPurchaseReturnTable(purchaseReturns);
}

/**
 * Fetches purchase returns from the backend.
 * @param filters - Query parameters for filtering the list
 */
async function fetchPurchaseReturns(filters) {
  const queryString = buildQueryString(filters);
  const response = await fetch(`/api/purchase-returns?${queryString}`);
  
  if (!response.ok) {
    handleError("Failed to fetch purchase returns");
    return [];
  }
  
  return await response.json();
}