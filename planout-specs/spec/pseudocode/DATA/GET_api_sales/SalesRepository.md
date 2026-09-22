/**
 * Fetches a paginated list of sales based on session scope and query filters.
 * 
 * @param session - The authenticated user's session containing company_id and store_id.
 * @param filters - The parsed query parameters from the API request.
 */
function getSalesList(session, filters) {
  // 1. Define base scope (Fixed server-side requirements)
  let query = Sale.where({
    company_id: session.company_id,
    store_id: session.store_id,
    source: 'POS'
  }).whereNot({
    workflow_state: 'voided'
  });

  // 2. Apply dynamic filters from query parameters
  if (filters.ref_code_start) {
    query = query.whereLike('ref_code', `${filters.ref_code_start}%`);
  }
  if (filters.store_id_eq) {
    query = query.where({ store_id: filters.store_id_eq });
  }
  if (filters.customer_name_cont) {
    query = query.whereLike('customer_name', `%${filters.customer_name_cont}%`);
  }
  if (filters.vehicle_registration_start) {
    query = query.whereLike('vehicle_registration', `${filters.vehicle_registration_start}%`);
  }
  if (filters.salesperson_id_eq) {
    query = query.where({ salesperson_id: filters.salesperson_id_eq });
  }
  if (filters.workflow_state_eq) {
    query = query.where({ workflow_state: filters.workflow_state_eq });
  }
  if (filters.ecommerce_ref_code_cont) {
    query = query.whereLike('ecommerce_ref_code', `%${filters.ecommerce_ref_code_cont}%`);
  }

  // 3. Apply Date Range filtering
  const dateColumn = filters.date_option === 'completed_at' ? 'completed_at' : 'created_at';
  if (filters.from_date) {
    query = query.whereGte(dateColumn, filters.from_date);
  }
  if (filters.to_date) {
    query = query.whereLte(dateColumn, filters.to_date);
  }

  // 4. Apply Pagination and Sorting
  // Default: created_at DESC
  return query
    .orderBy('created_at', 'DESC')
    .limit(filters.limit || 20)
    .offset(filters.offset || 0)
    .execute();
}