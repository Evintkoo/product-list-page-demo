/**
 * Fetches the header details for a specific Franchise Purchase Order.
 * Endpoint: GET /api/franchise-purchase-orders/:id
 */
function getFranchisePurchaseOrder(id: UUID): FranchisePurchaseOrder {
    return database.query("SELECT * FROM FranchisePurchaseOrder WHERE id = ?", [id]);
}

/**
 * Fetches the paginated line items for a specific Franchise Purchase Order.
 * Endpoint: GET /api/franchise-purchase-orders/:id/items
 */
function getFranchisePurchaseOrderItems(id: UUID, page: Integer, limit: Integer): List<FranchisePurchaseOrderItem> {
    return database.query(
        "SELECT * FROM FranchisePurchaseOrderItem WHERE franchise_purchase_order_id = ? ORDER BY line_no ASC LIMIT ? OFFSET ?", 
        [id, limit, (page - 1) * limit]
    );
}