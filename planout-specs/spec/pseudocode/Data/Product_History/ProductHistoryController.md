/**
 * API Endpoint: GET /api/products/:productId/history
 * Maps internal database fields to the frontend-required JSON structure.
 */
FUNCTION handleGetProductHistory(request):
    productId = request.params.productId
    historyRecords = getProductHistoryByProductId(productId)
    
    RETURN historyRecords.map(record => ({
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
    }));