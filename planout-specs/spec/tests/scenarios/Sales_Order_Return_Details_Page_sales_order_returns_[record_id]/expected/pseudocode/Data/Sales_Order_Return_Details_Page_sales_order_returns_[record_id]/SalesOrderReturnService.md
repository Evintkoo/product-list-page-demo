/**
 * Orchestrates the data aggregation for the TURBOLYMIG-330 detail page.
 * Combines the header/amount/payment data with the itemized list.
 */
FUNCTION getSalesOrderReturnDetails(record_id: UUID):
    LET returnHeader = getSalesOrderReturnById(record_id)
    LET items = getSalesOrderReturnItems(record_id)
    
    // Calculate total quantity for the footer row
    LET totalQuantity = SUM(items.quantity)
    
    RETURN {
        header: returnHeader,
        items: items,
        summary: {
            totalQuantity: totalQuantity
        }
    }