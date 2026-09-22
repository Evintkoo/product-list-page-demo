/**
 * Fetches a paginated list of payment types based on active status and optional filters.
 * 
 * @param filters - Object containing query parameters for filtering
 * @param pagination - Object containing page and page_size
 */
FUNCTION getPaymentTypes(filters, pagination)
    // 1. Extract parameters from request
    SET is_active = filters.is_active
    SET name_query = filters.name
    SET type_query = filters.payment_type
    SET refund_query = filters.enable_refund
    SET skip_invoice_query = filters.skip_invoice_receivables
    
    // 2. Execute primary data query
    SET results = DB.query("
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
        LIMIT :page_size OFFSET (:page - 1) * :page_size
    ", { is_active, name: name_query, payment_type: type_query, enable_refund: refund_query, skip_invoice_receivables: skip_invoice_query, page: pagination.page, page_size: pagination.page_size })

    // 3. Execute count query for pagination metadata
    SET count_result = DB.query("
        SELECT COUNT(*) AS total_items
        FROM payment_type
        WHERE is_active = :is_active
          AND (:name IS NULL OR name LIKE CONCAT('%', :name, '%'))
          AND (:payment_type IS NULL OR payment_type = :payment_type)
          AND (:enable_refund IS NULL OR enable_refund = :enable_refund)
          AND (:skip_invoice_receivables IS NULL OR skip_invoice_receivables = :skip_invoice_receivables)
    ", { is_active, name: name_query, payment_type: type_query, enable_refund: refund_query, skip_invoice_receivables: skip_invoice_query })

    // 4. Calculate pagination metadata
    SET total_items = count_result.total_items
    SET total_pages = CEIL(total_items / pagination.page_size)

    // 5. Return structured response
    RETURN {
        "payment_types": results,
        "pagination": {
            "page": pagination.page,
            "page_size": pagination.page_size,
            "total_items": total_items,
            "total_pages": total_pages
        }
    }
END FUNCTION