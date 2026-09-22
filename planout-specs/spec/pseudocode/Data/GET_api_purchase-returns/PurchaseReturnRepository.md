/**
 * Data access layer for Purchase Returns.
 * Handles retrieval of return records and associated line items from the database.
 */

FUNCTION getPurchaseReturns(filters: { status?: string, startDate?: datetime, endDate?: datetime }):
    // Query the PurchaseReturn table
    // Apply optional filters for status and date range
    // Return a list of PurchaseReturn records ordered by return_date descending
    RETURN db.PurchaseReturn.findMany({
        where: {
            status: filters.status,
            return_date: { gte: filters.startDate, lte: filters.endDate }
        },
        orderBy: { return_date: "desc" }
    })

FUNCTION getPurchaseReturnItems(purchaseReturnIds: uuid[]):
    // Fetch all line items associated with the provided list of return IDs
    // This allows the service layer to hydrate the return objects efficiently
    RETURN db.PurchaseReturnItem.findMany({
        where: {
            purchase_return_id: { in: purchaseReturnIds }
        }
    })

FUNCTION getPurchaseOrderDetails(purchaseOrderIds: uuid[]):
    // Fetch basic PO info to provide context (e.g., order_number) for the returns
    RETURN db.PurchaseOrder.findMany({
        where: {
            id: { in: purchaseOrderIds }
        },
        select: { id: true, order_number: true }
    })