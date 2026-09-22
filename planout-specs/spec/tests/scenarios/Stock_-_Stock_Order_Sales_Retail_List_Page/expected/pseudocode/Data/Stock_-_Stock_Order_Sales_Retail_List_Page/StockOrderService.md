/**
 * Fetches the list of retail stock orders for the Sales Retail List Page.
 * Filters by stock_type 'sales_retail' and restricts source_type to 'sale' or 'shipping_sale'.
 */
FUNCTION getSalesRetailStockOrders(limit: 20, offset: 0):
  CALL GET /api/stock-orders WITH:
    params: {
      stock_type: "sales_retail",
      limit: limit,
      offset: offset
    }
  
  ON SUCCESS (200 OK):
    RETURN mapStockOrderResponse(response.data)
  
  ON ERROR:
    THROW Error("Failed to fetch Sales Retail Stock Orders")