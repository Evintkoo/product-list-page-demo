/**
 * Fetches a paginated list of Sales Quotations for the authenticated company.
 * Joins with the users table to resolve the updater's full name.
 */
function getSalesQuotations(
  companyId: UUID,
  filters: {
    document_number?: string,
    sales_order_id?: UUID,
    customer?: string,
    status?: string
  },
  pagination: { limit: number, offset: number },
  sort: { field: string, direction: 'asc' | 'desc' }
) {
  return db.query(`
    SELECT
      sq.sales_quotation_id,
      sq.ref_code,
      sq.sales_order_id,
      sq.sales_order_ref_code,
      sq.customer_id,
      sq.customer_name,
      sq.customer_ref_code,
      sq.due_at,
      sq.sent_at,
      sq.workflow_state,
      sq.total,
      updater.user_id AS updater_id,
      updater.full_name AS updater_name,
      sq.created_at,
      sq.updated_at
    FROM sales_quotation sq
    LEFT JOIN users updater ON updater.user_id = sq.updater_id
    WHERE sq.company_id = :companyId
      AND (:document_number IS NULL OR sq.ref_code ILIKE :document_number || '%')
      AND (:sales_order_id IS NULL OR sq.sales_order_id = :sales_order_id)
      AND (:customer IS NULL OR sq.customer_name ILIKE '%' || :customer || '%')
      AND (:status IS NULL OR sq.workflow_state = :status)
    ORDER BY ${sort.field} ${sort.direction}
    LIMIT :limit OFFSET :offset
  `, {
    companyId,
    ...filters,
    ...pagination
  });
}