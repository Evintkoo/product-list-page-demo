/**
 * Fetches a paginated list of StockReturn records filtered by franchise-specific criteria.
 * 
 * @param {Object} filters - The filter criteria (workflow_state, store_id, supplier_id, warehouse_id, ref_code_start, order_ref_code_start, created_at_gt, created_at_lt)
 * @param {Object} pagination - The pagination settings (page, limit)
 * @param {UUID} companyId - The ID of the authenticated user's company
 * @returns {Promise<StockReturn[]>}
 */
function getFranchisePurchaseReturns(filters, pagination, companyId) {
  return db.StockReturn.findMany({
    where: {
      company_id: companyId,
      type: { in: ['franchise_external', 'franchise_internal'] },
      workflow_state: filters.workflow_state,
      store_id: filters.store_id,
      supplier_id: filters.supplier_id,
      warehouse_id: filters.warehouse_id,
      ref_code: { startsWith: filters.ref_code_start },
      order_ref_code: { startsWith: filters.order_ref_code_start },
      created_at: {
        gt: filters.created_at_gt,
        lt: filters.created_at_lt
      }
    },
    orderBy: {
      created_at: 'desc'
    },
    skip: (pagination.page - 1) * pagination.limit,
    take: pagination.limit
  });
}

/**
 * Counts total records matching the criteria for pagination metadata.
 */
function countFranchisePurchaseReturns(filters, companyId) {
  return db.StockReturn.count({
    where: {
      company_id: companyId,
      type: { in: ['franchise_external', 'franchise_internal'] },
      // ... apply same filters as above
    }
  });
}