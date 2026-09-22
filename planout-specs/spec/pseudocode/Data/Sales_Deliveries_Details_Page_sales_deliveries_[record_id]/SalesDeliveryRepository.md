/**
 * Fetches the complete Sales Delivery record including nested lines
 * and associated metadata for the detail page view.
 */
FUNCTION getSalesDeliveryById(id: UUID):
  // Join SalesDelivery with related entities to populate header and table data
  QUERY SalesDelivery
    LEFT JOIN SalesOrder ON SalesDelivery.sales_order_id = SalesOrder.id
    LEFT JOIN SalesInvoice ON SalesDelivery.sales_invoice_id = SalesInvoice.id
    LEFT JOIN Warehouse ON SalesDelivery.warehouse_id = Warehouse.id
    LEFT JOIN Customer ON SalesDelivery.customer_id = Customer.id
    LEFT JOIN Journal ON SalesDelivery.journal_id = Journal.id
    WHERE SalesDelivery.id = id

  // Fetch associated line items
  QUERY SalesDeliveryLine
    WHERE sales_delivery_id = id

  RETURN {
    ...SalesDeliveryRecord,
    lines: SalesDeliveryLineRecords
  }