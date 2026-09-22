/**
 * Controller to handle retrieval of line items for a specific franchise purchase order.
 */
function getFranchisePurchaseOrderItems(request, response) {
    const { id } = request.params;
    const { page = 1, limit = 20 } = request.query;
    const authenticatedCompanyId = request.user.company_id; <!-- MISSING_FIELD: User.company_id -->

    // 1. Validate the parent FranchisePurchaseOrder exists and belongs to the user's company
    const order = Database.FranchisePurchaseOrder.findOne({
        where: {
            id: id,
            company_id: authenticatedCompanyId
        }
    });

    if (!order) {
        return response.status(404).json({ error: "Franchise Purchase Order not found or access denied." });
    }

    // 2. Fetch paginated items
    // Results are returned in insertion order (created_at ASC)
    const items = Database.FranchisePurchaseOrderItem.findMany({
        where: { franchise_purchase_order_id: id },
        orderBy: { created_at: "asc" },
        skip: (page - 1) * limit,
        take: limit
    });

    const totalCount = Database.FranchisePurchaseOrderItem.count({
        where: { franchise_purchase_order_id: id }
    });

    // 3. Return the response
    return response.status(200).json({
        data: items,
        total_count: totalCount,
        page: parseInt(page),
        limit: parseInt(limit)
    });
}