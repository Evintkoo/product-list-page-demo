/**
 * Fetches the list of Purchase Orders with optional filtering.
 * Includes counts for related entities (Returns, Invoices, Deliveries).
 */
FUNCTION getPurchaseOrders(filters) {
    // 1. Fetch base PurchaseOrder records
    // Filters: supplier_id, warehouse_id
    LET orders = DATABASE.PurchaseOrder.findMany(filters);

    // 2. Enrich records with related counts and names
    FOR EACH order IN orders {
        // Fetch related names for display
        order.warehouse_name = DATABASE.Warehouse.findById(order.warehouse_id).name;
        order.supplier_name = DATABASE.Supplier.findById(order.supplier_id).name;

        // Calculate derived counts
        order.returns_count = DATABASE.Return.count({ purchase_order_id: order.id });
        order.invoices_count = DATABASE.Invoice.count({ purchase_order_id: order.id });
        order.deliveries_count = DATABASE.Delivery.count({ purchase_order_id: order.id });
    }

    RETURN orders;
}