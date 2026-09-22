/**
 * Data access layer for Sale entities.
 * Handles direct database interaction for the GET /api/sales/:id endpoint.
 */

FUNCTION findSaleById(saleId: uuid):
    // Query the database for the primary Sale record
    SET saleRecord = SELECT * FROM Sale WHERE id = saleId

    IF saleRecord IS NULL:
        RETURN NULL

    // Fetch associated line items for the sale
    SET items = SELECT * FROM SaleItem WHERE sale_id = saleId

    // Construct and return the aggregate object
    RETURN {
        ...saleRecord,
        items: items
    }