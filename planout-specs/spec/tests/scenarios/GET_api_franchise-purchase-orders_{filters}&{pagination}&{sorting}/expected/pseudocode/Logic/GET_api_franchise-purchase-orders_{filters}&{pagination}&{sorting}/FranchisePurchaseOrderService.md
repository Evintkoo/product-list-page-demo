/**
 * Service for querying FranchisePurchaseOrder entities.
 */
function list({ companyId, filters, pagination, sorting }) {
    // 1. Build base query scoped to company
    let query = DB.FranchisePurchaseOrder.where({ company_id: companyId });

    // 2. Apply filters
    if (filters.status) query = query.where({ status: filters.status });
    if (filters.order_type) query = query.where({ order_type: filters.order_type });
    if (filters.created_at_from) query = query.where('created_at', '>=', filters.created_at_from);
    if (filters.created_at_to) query = query.where('created_at', '<=', filters.created_at_to);

    // 3. Get total count before pagination
    const total = query.count();

    // 4. Apply sorting and pagination
    const data = query
        .orderBy(sorting.sort_by, sorting.sort_order)
        .limit(pagination.limit)
        .offset(pagination.offset)
        .fetchAll();

    // 5. Map data to include calculated fields (order_amount, received_amount)
    const enrichedData = data.map(order => {
        const lines = DB.FranchisePurchaseOrderLine.where({ purchase_order_id: order.id });
        
        const order_amount = lines.sum('quantity * unit_price'); <!-- MISSING_FIELD: FranchisePurchaseOrderLine.order_amount -->
        const received_amount = lines.sum('received_quantity * unit_price'); <!-- MISSING_FIELD: FranchisePurchaseOrderLine.received_amount -->
        
        return {
            ...order,
            order_amount,
            received_amount
        };
    });

    return { data: enrichedData, total };
}