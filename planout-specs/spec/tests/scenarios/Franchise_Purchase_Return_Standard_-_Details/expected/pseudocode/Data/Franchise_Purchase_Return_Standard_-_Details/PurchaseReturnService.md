/**
 * Business logic layer to aggregate return details for the UI.
 */

FUNCTION getFullPurchaseReturnDetails(id: uuid):
    // Orchestrate data fetching
    SET returnHeader = CALL getPurchaseReturnById(id)
    SET returnItems = CALL getPurchaseReturnItems(id)
    
    IF returnHeader IS NULL:
        THROW Error("Purchase Return not found")
        
    RETURN {
        header: returnHeader,
        items: returnItems,
        summary: {
            totalItems: COUNT(returnItems),
            totalValue: SUM(returnItems.quantity * returnItems.unit_price)
        }
    }