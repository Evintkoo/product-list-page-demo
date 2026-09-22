/**
 * Fetches the complete detail set for a specific Sales Order Return.
 * Joins related entities to provide display labels for the UI.
 */
FUNCTION getSalesOrderReturnById(record_id: UUID):
    RETURN SalesOrderReturn
        JOIN SalesOrder ON SalesOrderReturn.sales_order_id = SalesOrder.id
        JOIN SalesInvoice ON SalesOrderReturn.sales_invoice_id = SalesInvoice.id
        JOIN Customer ON SalesOrderReturn.customer_id = Customer.id
        JOIN Warehouse ON SalesOrderReturn.warehouse_id = Warehouse.id
        JOIN Journal ON SalesOrderReturn.journal_id = Journal.id
        WHERE SalesOrderReturn.id = record_id

/**
 * Fetches all line items associated with the return.
 */
FUNCTION getSalesOrderReturnItems(record_id: UUID):
    RETURN LIST OF SalesOrderReturnItem
        WHERE sales_order_return_id = record_id