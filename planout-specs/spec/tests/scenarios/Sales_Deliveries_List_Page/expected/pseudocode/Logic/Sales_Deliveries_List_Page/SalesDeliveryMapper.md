/**
 * Maps the raw API response entity to the UI table structure.
 */
function mapDeliveryToTable(delivery, salesOrder, salesInvoice, customer, warehouse) {
    return {
        id: delivery.id,
        sales_delivery: delivery.delivery_number,
        reference_number: delivery.reference_number,
        date: delivery.delivery_datetime,
        status: delivery.workflow_state,
        warehouse: warehouse?.name,
        sales_order: salesOrder?.order_number,
        sales_invoice: salesInvoice?.invoice_number,
        customer_name: customer?.customer_name
    };
}