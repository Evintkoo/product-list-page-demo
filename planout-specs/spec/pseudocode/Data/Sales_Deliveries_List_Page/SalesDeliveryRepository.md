/**
 * Data access layer for Sales Deliveries.
 * Maps the internal database schema to the API response structure required by the frontend.
 */

FUNCTION getSalesDeliveriesList():
    QUERY:
        SELECT 
            sd.delivery_number,
            sd.reference_number,
            sd.delivery_datetime,
            sd.workflow_state,
            so.order_number AS sales_order,
            w.name AS warehouse,
            si.invoice_number AS sales_invoice,
            c.customer_name AS customer_name
        FROM SalesDelivery sd
        LEFT JOIN SalesOrder so ON sd.sales_order_id = so.id
        LEFT JOIN Warehouse w ON sd.warehouse_id = w.id
        LEFT JOIN SalesInvoice si ON sd.sales_invoice_id = si.id
        LEFT JOIN Customer c ON sd.customer_id = c.id
        ORDER BY sd.delivery_datetime DESC

    RETURN result_set