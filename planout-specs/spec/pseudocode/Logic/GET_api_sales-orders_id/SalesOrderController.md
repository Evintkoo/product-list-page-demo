/**
 * Controller for handling Sales Order detail requests.
 * Ensures strict scoping to the authenticated user's company.
 */
function getSalesOrderDetails(request, response) {
    const { id } = request.params;
    const { company_id } = request.session;

    if (!company_id) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    try {
        // Query for the SalesOrder, enforcing company_id and is_store_wholesale constraints
        const salesOrder = database.SalesOrder.findOne({
            where: {
                id: id,
                company_id: company_id,
                is_store_wholesale: false
            }
        });

        if (!salesOrder) {
            return response.status(404).json({ error: "Sales order not found" });
        }

        // Fetch associated line items
        const items = database.SalesOrderItem.findMany({
            where: {
                sales_order_id: salesOrder.id
            }
        });

        // Construct response object
        const result = {
            id: salesOrder.id,
            status: salesOrder.status,
            created_at: salesOrder.created_at,
            items: items.map(item => ({
                id: item.id,
                product_name: item.product_name,
                quantity: item.quantity,
                price: item.price
            }))
        };

        return response.status(200).json(result);

    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}