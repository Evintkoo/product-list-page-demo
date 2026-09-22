/**
 * Fetches a paginated list of franchise stock returns.
 * Filters by franchise-specific types and applies dynamic search/filter criteria.
 */
function getFranchisePurchaseReturnList(params) {
  const {
    limit = 20,
    offset = 0,
    workflow_state,
    store_id,
    supplier_id,
    warehouse_id,
    ref_code_start,
    order_ref_code_start,
    created_at_gt,
    created_at_lt
  } = params;

  // Execute query joining related entities for display names
  const results = db.query(`
    SELECT
      sr.stock_return_id,
      sr.ref_code,
      sr.type,
      sr.workflow_state,
      sr.created_at,
      sr.sent_at,
      sr.approved_at,
      st.name AS from_store_name,
      COALESCE(sup_r.name, sup_o.name) AS supplier_name,
      wh.name AS warehouse_name,
      so.ref_code AS source_order_ref_code,
      u.name AS user_name,
      COUNT(*) OVER() AS total_count
    FROM stock_returns sr
    LEFT JOIN stores st ON st.store_id = sr.sender_location_id
    LEFT JOIN suppliers sup_r ON sup_r.supplier_id = sr.receiver_location_id AND sr.receiver_location_type = 'supplier'
    LEFT JOIN warehouses wh ON wh.id = sr.receiver_location_id AND sr.receiver_location_type = 'warehouse'
    LEFT JOIN franchise_purchase_orders so ON so.franchise_purchase_order_id = sr.source_order_id
    LEFT JOIN suppliers sup_o ON sup_o.supplier_id = so.supplier_id
    LEFT JOIN users u ON u.id = sr.creator_id
    WHERE sr.type IN ('franchise_external', 'franchise_internal')
      AND (:workflow_state IS NULL OR sr.workflow_state = :workflow_state)
      AND (:store_id IS NULL OR sr.sender_location_id = :store_id)
      AND (:supplier_id IS NULL OR sup_r.supplier_id = :supplier_id OR sup_o.supplier_id = :supplier_id)
      AND (:warehouse_id IS NULL OR (sr.receiver_location_type = 'warehouse' AND sr.receiver_location_id = :warehouse_id))
      AND (:ref_code_start IS NULL OR sr.ref_code LIKE :ref_code_start || '%')
      AND (:order_ref_code_start IS NULL OR so.ref_code LIKE :order_ref_code_start || '%')
      AND (:created_at_gt IS NULL OR sr.created_at > :created_at_gt)
      AND (:created_at_lt IS NULL OR sr.created_at < :created_at_lt)
    ORDER BY sr.created_at DESC
    LIMIT :limit OFFSET :offset
  `, { 
    limit, offset, workflow_state, store_id, supplier_id, warehouse_id, 
    ref_code_start, order_ref_code_start, created_at_gt, created_at_lt 
  });

  const total = results.length > 0 ? results[0].total_count : 0;

  return {
    data: results.map(row => ({
      stock_return_id: row.stock_return_id,
      ref_code: row.ref_code,
      source_order_ref_code: row.source_order_ref_code,
      created_at: row.created_at,
      sent_at: row.sent_at,
      approved_at: row.approved_at,
      from_store_name: row.from_store_name,
      supplier_name: row.supplier_name,
      warehouse_name: row.warehouse_name,
      workflow_state: row.workflow_state,
      user_name: row.user_name,
      type: row.type
    })),
    pagination: {
      limit,
      offset,
      total
    }
  };
}