/**
 * Data access layer for Ecommerce Sales.
 * Handles the retrieval and mapping of sales data for the Sales List view.
 */

FUNCTION getEcommerceSalesList(limit: integer, offset: integer):
    // Query the Sale entity joined with related entities for display
    SELECT 
        s.id AS sale_id,
        s.ref_code,
        s.ecommerce_ref_code,
        s.created_at,
        s.completed_at,
        c.customer_name,
        v.vehicle_registration,
        s.workflow_state,
        st.store_name,
        s.delivery_method,
        s.source,
        s.total,
        s.customer_id,
        s.vehicle_id
    FROM Sale s
    LEFT JOIN Customer c ON s.customer_id = c.id
    LEFT JOIN Vehicle v ON s.vehicle_id = v.id
    LEFT JOIN Store st ON s.store_id = st.id
    WHERE s.source = 'ecommerce'
    ORDER BY s.created_at DESC
    LIMIT limit OFFSET offset;

/**
 * Maps the raw database result to the UI-ready Sale Ecommerce List Response format.
 */
FUNCTION mapToSaleEcommerceResponse(data: List<SaleRow>):
    RETURN {
        "data": data.map(row => ({
            "sale_id": row.sale_id,
            "ref_code": row.ref_code,
            "ecommerce_ref_code": row.ecommerce_ref_code,
            "created_at": row.created_at,
            "completed_at": row.completed_at,
            "customer_name": row.customer_name,
            "vehicle_registration": row.vehicle_registration,
            "workflow_state": row.workflow_state,
            "store_name": row.store_name,
            "delivery_method": row.delivery_method,
            "source": row.source,
            "total": row.total,
            "customer_id": row.customer_id,
            "vehicle_id": row.vehicle_id
        })),
        "pagination": {
            "limit": limit,
            "offset": offset,
            "total": countTotalEcommerceSales()
        }
    };