/**
 * Service layer to handle business logic for Purchase Orders.
 */
FUNCTION ListPurchaseOrders(companyId):
    // Validate that the company exists
    // <!-- MISSING_FIELD: Company.id -->
    IF NOT Database.Company.exists(id = companyId):
        RETURN 404 Not Found

    RETURN Database.PurchaseOrder.findMany(
        WHERE company_id = companyId
    )