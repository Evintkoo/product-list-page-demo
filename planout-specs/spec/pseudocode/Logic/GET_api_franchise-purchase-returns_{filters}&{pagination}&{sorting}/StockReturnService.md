/**
 * Service layer to interact with StockReturn entity.
 */
function findFranchiseReturns(companyId, filters) {
    // Base query: Scope to company and franchise types
    let query = DB.StockReturn.where({ 
        company_id: companyId,
        type: ["franchise_external", "franchise_internal"] 
    });

    // Apply dynamic filters
    if (filters.workflow_state) query = query.where({ workflow_state: filters.workflow_state });
    if (filters.store_id) query = query.where({ store_id: filters.store_id });
    if (filters.supplier_id) query = query.where({ supplier_id: filters.supplier_id });
    if (filters.warehouse_id) query = query.where({ warehouse_id: filters.warehouse_id });
    
    // Apply string prefix searches
    if (filters.ref_code_start) query = query.whereLike("ref_code", `${filters.ref_code_start}%`);
    if (filters.order_ref_code_start) query = query.whereLike("order_ref_code", `${filters.order_ref_code_start}%`);
    
    // Apply date range filters
    if (filters.created_at_gt) query = query.where("created_at", ">", filters.created_at_gt);
    if (filters.created_at_lt) query = query.where("created_at", "<", filters.created_at_lt);

    // Apply sorting and pagination
    return query
        .orderBy("created_at", "DESC")
        .paginate(filters.page, filters.limit)
        .execute();
}