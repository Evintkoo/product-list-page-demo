/**
 * GET /api/purchase-orders
 * Maps incoming query parameters to the repository layer.
 */
async function handleGetPurchaseOrders(req, res) {
  const filters = {
    company_id: req.session.company_id,
    order_type: req.query.order_type,
    is_fixed_asset: req.query.is_fixed_asset === 'true',
    ref_code: req.query.ref_code,
    supplier_ref_code: req.query.supplier_ref_code,
    supplier_id: req.query.supplier_id,
    warehouse_id: req.query.warehouse_id,
    workflow_state: req.query.workflow_state_in, // Expects array
    created_at_from: req.query.created_at_from,
    created_at_to: req.query.created_at_to,
    sort_by: req.query.sort_by || 'created_at',
    sort_order: req.query.sort_order || 'desc',
    limit: parseInt(req.query.limit) || 20,
    offset: parseInt(req.query.offset) || 0
  };

  const results = await getPurchaseOrderList(filters);

  return res.json({
    data: results.rows,
    pagination: {
      limit: filters.limit,
      offset: filters.offset,
      total: results.totalCount
    }
  });
}