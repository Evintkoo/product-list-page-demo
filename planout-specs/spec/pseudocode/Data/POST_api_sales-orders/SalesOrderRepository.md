/**
 * Validates existence of foreign keys within the caller's company scope.
 * Throws 422 error if any reference is invalid.
 */
function validateReferences(orderData) {
    const { customer_id, warehouse_id, salesperson_id, items } = orderData;
    
    if (!Customer.exists(customer_id)) throw new UnprocessableEntityError("Invalid customer_id");
    if (!Warehouse.exists(warehouse_id)) throw new UnprocessableEntityError("Invalid warehouse_id");
    if (!User.exists(salesperson_id)) throw new UnprocessableEntityError("Invalid salesperson_id");
    
    for (const item of items) {
        if (!Product.exists(item.product_id)) {
            throw new UnprocessableEntityError(`Invalid product_id: ${item.product_id}`);
        }
    }
}

/**
 * Persists the Sales Order and its items within a database transaction.
 */
function createSalesOrder(orderData) {
    return Transaction.execute(() => {
        const order = SalesOrder.insert({
            customer_id: orderData.customer_id,
            warehouse_id: orderData.warehouse_id,
            salesperson_id: orderData.salesperson_id,
            workflow_state: 'draft',
            created_at: now()
        });

        for (const item of orderData.items) {
            SalesOrderItem.insert({
                sales_order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity
            });
        }
        
        return order;
    });
}