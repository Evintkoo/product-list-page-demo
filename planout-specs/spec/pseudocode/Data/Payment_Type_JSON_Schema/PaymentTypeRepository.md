/**
 * Data access layer for the Payment Type entity.
 * Handles filtering, pagination, and total count retrieval for the list view.
 */

FUNCTION getPaymentTypeList(filters: {
  is_active: boolean,
  name?: string,
  payment_type?: string,
  enable_refund?: boolean,
  skip_invoice_receivables?: boolean,
  page: number,
  page_size: number
}):
  RETURNS { data: Array<payment_type>, total_items: number }

  // 1. Calculate pagination offset
  SET offset = (filters.page - 1) * filters.page_size

  // 2. Execute main query to fetch paginated records
  SET results = DB.query(`
    SELECT 
      payment_type_id, name, payment_type, bank_card_provider, 
      payment_service_provider, provider_fee_rate, enable_refund, 
      skip_invoice_receivables
    FROM payment_type
    WHERE is_active = :is_active
      AND (:name IS NULL OR name LIKE CONCAT('%', :name, '%'))
      AND (:payment_type IS NULL OR payment_type = :payment_type)
      AND (:enable_refund IS NULL OR enable_refund = :enable_refund)
      AND (:skip_invoice_receivables IS NULL OR skip_invoice_receivables = :skip_invoice_receivables)
    ORDER BY name ASC
    LIMIT :page_size OFFSET :offset
  `, filters)

  // 3. Execute count query for pagination metadata
  SET countResult = DB.query(`
    SELECT COUNT(*) AS total_items
    FROM payment_type
    WHERE is_active = :is_active
      AND (:name IS NULL OR name LIKE CONCAT('%', :name, '%'))
      AND (:payment_type IS NULL OR payment_type = :payment_type)
      AND (:enable_refund IS NULL OR enable_refund = :enable_refund)
      AND (:skip_invoice_receivables IS NULL OR skip_invoice_receivables = :skip_invoice_receivables)
  `, filters)

  RETURN {
    data: results,
    total_items: countResult.total_items
  }
END FUNCTION