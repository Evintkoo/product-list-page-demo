/**
 * Fetches a paginated list of purchase orders based on filters.
 * Scoped to the current company_id from the session.
 */
function getPurchaseOrderList(params: {
  company_id: string,
  order_type?: string,
  is_fixed_asset?: boolean,
  ref_code?: string,
  supplier_ref_code?: string,
  supplier_id?: string,
  warehouse_id?: string,
  workflow_state?: string[],
  created_at_from?: string,
  created_at_to?: string,
  sort_by: string,
  sort_order: 'asc' | 'desc',
  limit: number,
  offset: number
}) {
  // 1. Execute main query joining suppliers and warehouses
  // 2. Use LATERAL joins to calculate delivery_count, invoice_count, and return_count
  // 3. Apply filters:
  //    - ref_code/supplier_ref_code: ILIKE 'value%'
  //    - workflow_state: ANY(array)
  //    - created_at: range filter
  // 4. Return result set with total count for pagination
}