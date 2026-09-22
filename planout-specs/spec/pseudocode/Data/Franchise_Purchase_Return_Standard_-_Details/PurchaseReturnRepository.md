/**
 * Data access layer for Franchise Purchase Return details.
 * Handles retrieval of return headers and associated line items.
 */

FUNCTION getPurchaseReturnById(id: uuid):
    // Fetch the main return record joined with franchise and PO metadata
    RETURN DB.PurchaseReturn.findUnique({
        where: { id: id },
        include: {
            franchise: true,
            purchase_order: true
        }
    })

FUNCTION getPurchaseReturnItems(purchase_return_id: uuid):
    // Fetch all line items associated with the specific return
    RETURN DB.PurchaseReturnItem.findMany({
        where: { purchase_return_id: purchase_return_id }
    })