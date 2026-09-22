/**
 * Ensures the database output matches the JSON payload contract defined in the feature requirements.
 */

FUNCTION mapToDeliveryPayload(dbRow):
    RETURN {
        "sales_order": dbRow.sales_order,
        "delivery_datetime": dbRow.delivery_datetime,
        "reference_number": dbRow.reference_number,
        "delivery_number": dbRow.delivery_number,
        "warehouse": dbRow.warehouse,
        "sales_invoice": dbRow.sales_invoice,
        "customer_name": dbRow.customer_name,
        "workflow_state": dbRow.workflow_state
    }