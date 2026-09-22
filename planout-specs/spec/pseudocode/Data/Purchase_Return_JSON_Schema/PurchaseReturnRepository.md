/**
 * Fetches the paginated list of purchase returns for the company dashboard.
 * Maps database rows to the Company Purchase Return Response Shape.
 */
function getPurchaseReturnList(companyId: UUID, params: QueryParams) {
  return db.query(`
    SELECT
      pr.company_purchase_return_id,
      pr.ref_code,
      pr.return_type,
      pr.created_at,
      pr.sent_at,
      pr.approved_at,
      w.name AS warehouse_name,
      s.name AS supplier_name,
      pr.workflow_state,
      pr.is_fixed_asset
    FROM company_purchase_returns pr
    LEFT JOIN suppliers s ON s.supplier_id = pr.supplier_id
    LEFT JOIN warehouses w ON w.warehouse_id = pr.warehouse_id
    WHERE pr.company_id = :companyId
      AND pr.order_type = 'company_standard'
      AND pr.is_consignment = false
      -- Dynamic filters based on params (is_fixed_asset, ref_code, etc.)
    ORDER BY :sort_by :sort_order
    LIMIT :limit OFFSET :offset
  `, { companyId, ...params });
}

/**
 * Fetches full details for a specific standard purchase return.
 */
function getPurchaseReturnStandardDetail(companyId: UUID, purchaseReturnId: UUID) {
  const header = db.query(`
    SELECT * FROM stock_returns 
    WHERE purchase_return_id = :purchaseReturnId 
    AND company_id = :companyId
  `);

  if (!header) throw new NotFoundError();

  const items = db.query(`
    SELECT i.*, p.sku, p.name as product_name 
    FROM stock_return_items i
    JOIN products p ON p.product_id = i.product_id
    WHERE i.purchase_return_id = :purchaseReturnId
  `);

  return { ...header, items };
}

/**
 * Fetches approval-specific data for a standard purchase return.
 * Validates that the state is 'sent_to_supplier'.
 */
function getPurchaseReturnApprovalData(companyId: UUID, purchaseReturnId: UUID) {
  const data = db.query(`
    SELECT * FROM stock_returns 
    WHERE purchase_return_id = :purchaseReturnId 
    AND company_id = :companyId
  `);

  if (!data) throw new NotFoundError();
  if (data.workflow_state !== 'sent_to_supplier') throw new ConflictError();

  return data;
}