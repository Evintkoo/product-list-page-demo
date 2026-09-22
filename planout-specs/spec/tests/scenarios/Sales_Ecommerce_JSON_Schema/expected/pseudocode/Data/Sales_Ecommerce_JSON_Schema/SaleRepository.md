/**
 * Fetches a paginated list of ecommerce sales.
 * 
 * @param filters - Object containing optional filter criteria:
 *   ref_code, store_id, customer_name, vehicle_registration, 
 *   workflow_state, ecommerce_ref_code, from_date, to_date
 * @param pagination - Object containing limit and offset
 */
function getEcommerceSales(filters, pagination) {
  // Determine the date column to filter by based on workflow_state
  // If workflow_state is 'completed', use completed_at, otherwise use created_at
  const dateColumn = filters.workflow_state === 'completed' ? 's.completed_at' : 's.created_at';

  const query = `
    SELECT
      s.sale_id, s.ref_code, s.ecommerce_ref_code, s.created_at, s.completed_at,
      s.customer_id, s.customer_name, s.vehicle_id, s.vehicle_registration,
      s.workflow_state, s.store_id, st.store_name, s.source, s.total,
      COUNT(*) OVER() AS total_count
    FROM sale s
    JOIN store st ON st.store_id = s.store_id
    WHERE s.source = 'ecommerce'
      AND s.workflow_state <> 'voided'
      AND ($1::text IS NULL OR s.ref_code ILIKE $1 || '%')
      AND ($2::uuid IS NULL OR s.store_id = $2)
      AND ($3::text IS NULL OR s.customer_name ILIKE '%' || $3 || '%')
      AND ($4::text IS NULL OR s.vehicle_registration ILIKE $4 || '%')
      AND ($5::text IS NULL OR s.workflow_state = $5)
      AND ($6::text IS NULL OR s.ecommerce_ref_code ILIKE '%' || $6 || '%')
      AND ($7::date IS NULL OR ${dateColumn} >= $7)
      AND ($8::date IS NULL OR ${dateColumn} < $8 + 1)
    ORDER BY s.created_at DESC
    LIMIT $9 OFFSET $10
  `;

  const params = [
    filters.ref_code,
    filters.store_id,
    filters.customer_name,
    filters.vehicle_registration,
    filters.workflow_state,
    filters.ecommerce_ref_code,
    filters.from_date,
    filters.to_date,
    pagination.limit,
    pagination.offset
  ];

  return executeQuery(query, params);
}