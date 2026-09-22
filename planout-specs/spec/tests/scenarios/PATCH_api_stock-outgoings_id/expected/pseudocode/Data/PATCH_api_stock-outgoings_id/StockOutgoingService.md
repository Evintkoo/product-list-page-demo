// Helper to validate stock levels across all lines
FUNCTION validateStockAvailability(source_id, lines):
    FOR EACH line IN lines:
        current_stock = DB.Inventory.find(source_id, line.product_id)
        IF current_stock.quantity < line.quantity:
            THROW UnprocessableEntityError("Insufficient stock for product: " + line.product_id)