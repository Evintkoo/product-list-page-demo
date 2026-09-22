/**
 * Logic to fetch the Sales Order Return detail page data.
 * Scoped to the authenticated user's company_id.
 */
function getSalesOrderReturnDetail(salesOrderReturnId, companyId) {
    // 1. Fetch the SalesOrderReturn header
    const returnHeader = db.SalesOrderReturn.findFirst({
        where: {
            id: salesOrderReturnId,
            company_id: companyId
        }
    });

    if (!returnHeader) {
        throw new NotFoundError("Sales order return not found");
    }

    // 2. Fetch all line items associated with this return
    const lineItems = db.SalesOrderReturnLineItem.findMany({
        where: { sales_order_return_id: returnHeader.id }
    });

    // 3. Enrich line items with Product names and Inventory stock levels
    const enrichedLineItems = lineItems.map(item => {
        const product = db.Product.findById(item.product_id);
        
        // Fetch stock level for this specific product in the receiving warehouse
        const inventory = db.Inventory.findFirst({
            where: {
                product_id: item.product_id,
                warehouse_id: returnHeader.receiving_warehouse_id
            }
        });

        return {
            product_id: item.product_id,
            product_name: product.name,
            quantity: item.quantity,
            stock_level: inventory ? inventory.stock_level : 0
        };
    });

    // 4. Construct the response object
    return {
        id: returnHeader.id,
        workflow_state: returnHeader.workflow_state,
        receiving_warehouse_id: returnHeader.receiving_warehouse_id,
        created_at: returnHeader.created_at,
        line_items: enrichedLineItems
    };
}