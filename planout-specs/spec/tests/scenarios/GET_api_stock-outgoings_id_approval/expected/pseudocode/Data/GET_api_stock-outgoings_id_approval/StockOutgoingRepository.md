FUNCTION getConfirmedOutgoingById(id):
    // Fetch the document and ensure it is in 'CONFIRMED' status
    // If status is 'DRAFT' or 'APPROVED', throw 409 Conflict
    // If not found, throw 404 Not Found
    RETURN StockOutgoing.find(id)

FUNCTION getOutgoingLinesWithPricing(stockOutgoingId, warehouseId):
    // Join StockOutgoingLine with Product to get current_average_cost
    // Join with Inventory to get current quantity_on_hand for the specific warehouse
    // Return list of lines:
    // {
    //    id,
    //    product_id,
    //    quantity,
    //    stock_qty: Inventory.quantity_on_hand,
    //    average_cost: Product.current_average_cost,
    //    coa_reversal_id: StockOutgoingLine.coa_id
    // }
    RETURN queryResult