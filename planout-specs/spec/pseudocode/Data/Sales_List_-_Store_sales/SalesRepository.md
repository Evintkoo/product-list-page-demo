/**
 * Fetches a paginated list of sales with joined relations for display.
 * @param limit - Number of records per page
 * @param offset - Number of records to skip
 * @returns A promise containing the list of sales and total count for pagination
 */
FUNCTION getSalesList(limit: integer, offset: integer):
    QUERY:
        SELECT 
            s.id AS sale_id,
            s.ref_code,
            s.created_at,
            s.completed_at,
            c.name AS customer_name,
            c.id AS customer_id,
            v.registration AS vehicle_registration,
            v.id AS vehicle_id,
            s.workflow_state,
            st.name AS store_name,
            u.name AS salesperson_name,
            s.source,
            s.total
        FROM Sale s
        LEFT JOIN Customer c ON s.customer_id = c.id
        LEFT JOIN Vehicle v ON s.vehicle_id = v.id
        LEFT JOIN Store st ON s.store_id = st.id
        LEFT JOIN User u ON s.salesperson_id = u.id
        ORDER BY s.created_at DESC
        LIMIT limit OFFSET offset;

    QUERY:
        SELECT COUNT(*) AS total FROM Sale;

    RETURN {
        data: [results_from_first_query],
        pagination: {
            limit: limit,
            offset: offset,
            total: total_from_second_query
        }
    };