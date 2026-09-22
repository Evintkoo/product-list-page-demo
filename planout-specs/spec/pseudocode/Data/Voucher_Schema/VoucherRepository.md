/**
 * Retrieves a paginated list of vouchers with joined product details and 
 * aggregated location strings.
 * 
 * @param filters - Object containing optional filters:
 *   - voucher_type: 'standard' | 'batch' | 'flexible'
 *   - sku: string
 *   - name: string
 *   - status: 'active' | 'inactive' | 'expired'
 *   - search: string (matches SKU or Name)
 * @param pagination - { limit: number, offset: number }
 */
FUNCTION getVoucherList(filters, pagination):
    QUERY = SELECT 
        v.voucher_id, 
        v.product_id, 
        p.sku, 
        p.product_name AS name, 
        v.voucher_type, 
        v.price_ex_tax, 
        v.value, 
        v.open_price,
        v.sell_location_scope,
        // Aggregate sell locations if scope is 'specific'
        CASE 
            WHEN v.sell_location_scope = 'all' THEN 'All Stores'
            ELSE (SELECT string_agg(s.store_name, ', ') FROM VoucherSellLocation vsl 
                  JOIN Store s ON s.store_id = vsl.store_id 
                  WHERE vsl.voucher_id = v.voucher_id)
        END AS sell_locations,
        v.redeem_location_scope,
        // Aggregate redeem locations if scope is 'specific'
        CASE 
            WHEN v.redeem_location_scope = 'all' THEN 'All Stores'
            ELSE (SELECT string_agg(s.store_name, ', ') FROM VoucherRedeemLocation vrl 
                  JOIN Store s ON s.store_id = vrl.store_id 
                  WHERE vrl.voucher_id = v.voucher_id)
        END AS redeem_locations,
        v.member_only,
        v.valid_from,
        v.valid_until,
        // Dynamic status calculation
        CASE 
            WHEN v.valid_until IS NOT NULL AND v.valid_until < CURRENT_DATE THEN 'expired'
            ELSE v.status
        END AS status,
        v.created_at,
        v.updated_at
    FROM Voucher v
    JOIN Product p ON p.product_id = v.product_id
    WHERE 
        (filters.voucher_type IS NULL OR v.voucher_type = filters.voucher_type)
        AND (filters.sku IS NULL OR p.sku ILIKE '%' + filters.sku + '%')
        AND (filters.name IS NULL OR p.product_name ILIKE '%' + filters.name + '%')
        AND (filters.status IS NULL OR v.status = filters.status)
        AND (filters.search IS NULL OR (p.sku ILIKE '%' + filters.search + '%' OR p.product_name ILIKE '%' + filters.search + '%'))
    ORDER BY v.created_at DESC
    LIMIT pagination.limit OFFSET pagination.offset

    RETURN executeQuery(QUERY)