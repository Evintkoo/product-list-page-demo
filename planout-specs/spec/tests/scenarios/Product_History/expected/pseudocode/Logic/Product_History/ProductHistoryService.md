/**
 * Fetches the full change log for a specific product.
 * @param productId - The UUID of the product to retrieve history for.
 */
function getProductHistory(productId: string) {
    // Call the API endpoint to retrieve the history records
    const response = API.get(`/api/products/${productId}/history`);
    
    if (response.status === 200) {
        return response.data.map(mapHistoryRecord);
    } else {
        handleError(response);
    }
}

/**
 * Maps the raw API response fields to the UI-friendly structure.
 */
function mapHistoryRecord(record) {
    return {
        updatedAt: record.updated_at,
        updatedBy: record.updated_by,
        companySupplyPrice: record.company_supply_price,
        wholesalePrice: record.wholesale_price,
        supplyPrice: record.supply_price,
        retailPrice: record.retail_price,
        tradeIn: record.trade_in,
        warranty: record.warranty,
        isActive: record.is_active,
        isTracked: record.is_tracked,
        isBundle: record.is_bundle
    };
}