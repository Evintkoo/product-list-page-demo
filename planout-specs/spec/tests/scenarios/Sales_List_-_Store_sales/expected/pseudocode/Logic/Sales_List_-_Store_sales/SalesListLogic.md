/**
 * Logic for initializing the Sales List page.
 * Handles session validation, data fetching, and state mapping.
 */
async function initializeSalesPage() {
  // 1. Validate Session
  const session = await fetch("/api/auth/me");
  if (!session.ok) {
    return redirectTo("/login");
  }

  // 2. Fetch initial data in parallel
  const [salesResponse, usersResponse, storesResponse] = await Promise.all([
    fetch("/api/sales?limit=20&offset=0"),
    fetch("/api/users"),
    fetch("/api/store")
  ]);

  const salesData = await salesResponse.json();
  const users = await usersResponse.json();
  const stores = await storesResponse.json();

  // 3. Map data to UI state
  updateSalesTable(salesData.data);
  updatePagination(salesData.pagination);
  updateSalespersonDropdown(users);
  updateStoreDropdown(stores);
}

/**
 * Handles Search Button interaction
 */
async function handleSearch(filters: { store_id?: string, salesperson_id?: string }) {
  const query = new URLSearchParams({
    limit: "20",
    offset: "0",
    ...filters
  });

  const response = await fetch(`/api/sales?${query.toString()}`);
  const data = await response.json();
  
  updateSalesTable(data.data);
  updatePagination(data.pagination);
}

/**
 * Maps raw API response to table rows
 */
function updateSalesTable(sales: Array<any>) {
  return sales.map(sale => ({
    ref_code: sale.ref_code,
    created_at: sale.created_at,
    completed_at: sale.completed_at,
    customer_name: sale.customer_name, <!-- MISSING_FIELD: Customer.name -->
    vehicle_registration: sale.vehicle_registration, <!-- MISSING_FIELD: Vehicle.registration -->
    workflow_state: sale.workflow_state,
    store_name: sale.store_name, <!-- MISSING_FIELD: Store.name -->
    salesperson_name: sale.salesperson_name, <!-- MISSING_FIELD: User.name -->
    source: sale.source,
    total: sale.total,
    sale_id: sale.id,
    customer_id: sale.customer_id,
    vehicle_id: sale.vehicle_id
  }));
}

/**
 * Handles pagination navigation
 */
async function onPageChange(page: number, limit: number) {
  const offset = (page - 1) * limit;
  // Fetch with existing filters (omitted for brevity)
  const response = await fetch(`/api/sales?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  
  updateSalesTable(data.data);
  updatePagination(data.pagination);
}