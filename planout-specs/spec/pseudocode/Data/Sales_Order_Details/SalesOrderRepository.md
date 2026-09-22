/**
 * Fetches the complete Sales Order aggregate including items and related metadata.
 * Used by the Sales Order Details page to populate the header, items table, and totals.
 */
FUNCTION getSalesOrderDetails(orderId: UUID):
    // Fetch primary order record
    order = DB.SalesOrder.find(orderId)
    
    // Fetch associated line items
    items = DB.SalesOrderItem.where(sales_order_id == orderId).list()
    
    // Fetch related entities for display enrichment
    warehouse = DB.Warehouse.find(order.warehouse_id)
    customer = DB.Customer.find(order.customer_id)
    
    RETURN {
        ...order,
        warehouse_name: warehouse.name,
        warehouse_address: warehouse.address,
        customer_name: customer.name,
        items: items
    }