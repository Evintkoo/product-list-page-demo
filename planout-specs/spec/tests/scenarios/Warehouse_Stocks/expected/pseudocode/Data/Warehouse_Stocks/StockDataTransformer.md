/**
 * Maps the database result set to the specific JSON structure required by the UI.
 * Calculates the summary total_quantity for the UI footer.
 */
FUNCTION transformStockData(data):
    SET total_summary = 0
    
    FOR EACH row IN data:
        total_summary += row.inventory_quantity
        
    RETURN {
        "stocks": data,
        "total_quantity": total_summary
    }