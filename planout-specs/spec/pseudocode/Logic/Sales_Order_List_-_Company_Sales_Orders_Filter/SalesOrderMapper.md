/**
 * Maps raw API response data to the internal SalesOrder entity structure.
 */
function mapToSalesOrderList(data: any[]): SalesOrder[] {
    return data.map(item => ({
        id: item.id,
        document_number: item.document_number,
        purchase_order_number: item.purchase_order_number,
        order_date: item.order_date,
        warehouse_id: item.warehouse_id,
        customer_id: item.customer_id,
        salesperson_id: item.salesperson_id,
        status: item.status,
        total_amount: item.total_amount
    }));
}