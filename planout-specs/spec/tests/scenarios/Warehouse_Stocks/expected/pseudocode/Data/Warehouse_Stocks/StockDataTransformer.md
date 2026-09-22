/**
 * Maps the raw database result set into the specific JSON structure 
 * required by the frontend UI components.
 */
FUNCTION transformStockData(rawRows):
    total_quantity_sum = SUM(rawRows.inventory_quantity)
    
    RETURN {
        "items": rawRows.map((row, index) => ({
            "no": index + 1,
            "warehouse_code": row.warehouse_code,
            "warehouse_name": row.warehouse_name,
            "inventory_quantity": row.inventory_quantity,
            "available_quantity": row.available_quantity,
            "reserved_quantity": row.reserved_quantity,
            "in_transit_quantity": row.in_transit_quantity,
            "min_quantity": row.min_quantity,
            "max_quantity": row.max_quantity,
            "average_cost": row.average_cost,
            "total_cost": row.total_cost
        })),
        "summary": {
            "total_quantity": total_quantity_sum
        }
    }