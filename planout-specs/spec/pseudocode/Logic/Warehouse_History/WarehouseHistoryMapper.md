/**
 * Maps the API response data to the UI component state.
 */
function mapHistoryToUI(data) {
    return data.map(item => ({
        ID: item.id,
        Date: item.createdAt,
        Warehouse: item.warehouseId,
        Type: item.type,
        "Qty Changed": item.quantityChanged,
        Notes: item.notes,
        "Created By": item.createdBy
    }));
}