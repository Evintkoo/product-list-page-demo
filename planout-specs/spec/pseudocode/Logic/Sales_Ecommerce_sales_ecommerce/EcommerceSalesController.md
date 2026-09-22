/**
 * Logic for initializing the Ecommerce Sales dashboard.
 * Handles authentication, data fetching, and state preparation.
 */

async function initializeEcommerceDashboard() {
  // 1. Verify Session
  try {
    await fetch("/auth/me");
  } catch (error) {
    // Redirect to Login if unauthenticated
    window.location.href = "/login";
    return;
  }

  // 2. Fetch Initial Data in Parallel
  const [salesResponse, storesResponse, usersResponse] = await Promise.all([
    fetchSalesList(20, 0),
    fetch("/stores"),
    fetch("/users")
  ]);

  // 3. Map and Populate UI
  const salesData = await salesResponse.json();
  const stores = await storesResponse.json();
  const users = await usersResponse.json();

  populateSalesTable(salesData);
  populateStoreDropdown(stores);
  populateSalespersonDropdown(users);
}

/**
 * Fetches ecommerce sales.
 * Server-side logic enforces: source = 'ecommerce' AND workflow_state != 'voided'
 */
async function fetchSalesList(limit, offset) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString()
  });
  
  return await fetch(`/sales/ecommerce?${params.toString()}`);
}

function populateSalesTable(data) {
  // Maps Sale entities to the UI table rows
  // Fields: ref_code, ecommerce_ref_code, created_at, total, workflow_state, etc.
}

function populateStoreDropdown(stores) {
  // Maps Store.id and Store.store_name to dropdown options
}

function populateSalespersonDropdown(users) {
  // Maps User entities to Salesperson dropdown options
  // <!-- MISSING_FIELD: User.id -->
  // <!-- MISSING_FIELD: User.name -->
}