// Node ID: a2f3d659-bc29-4db1-af0a-c3d8ed3b513f
// Title: Stock History Tab
// Description: Renders the stock history data grid for a specific product.
// Asset: assets/6e5f4d92-5031-4c71-ad5d-1e561c6be354.svg

Component StockHistoryView(product_id: UUID) {
  State stockHistoryData: List<StockHistory> = []
  State isLoading: Boolean = false
  State error: String | null = null

  // Triggered by "Product Tab Menu" selection
  Effect onMount {
    fetchStockHistory()
  }

  Function fetchStockHistory() {
    isLoading = true
    // API Call: GET /api/store-stock-histories
    // Query Params: product_id (from props)
    // Response: List<StockHistory>
    try {
      stockHistoryData = API.get("/api/store-stock-histories", { params: { product_id } })
    } catch (e) {
      error = "Failed to load stock history"
    } finally {
      isLoading = false
    }
  }

  Render {
    if (isLoading) return <Spinner />
    if (error) return <ErrorMessage message={error} />
    
    Table {
      Header: ["Date", "Store", "Change", "Reason"]
      Rows: stockHistoryData.map(item => {
        return [item.created_at, item.store_id, item.change_amount, item.reason]
      })
    }
  }
}
// Notes covered: Renders the stock history data grid for a specific product.