// Node ID: 254d28ab-a5cf-4459-84e9-af554afe91ae
// Title: Stock History Filter Panel
// Description: Provides filtering capabilities for the stock history view.
// Asset: assets/6e5f4d92-5031-4c71-ad5d-1e561c6be354.svg

Component StockHistoryFilter(onFilterChange: Function) {
  // Fields match API PAYLOADS request.body for GET /api/store-stock-histories
  State filters = {
    store_id: "",
    type: "",
    from_date: "",
    to_date: "",
    created_by: "",
    search: ""
  }

  Render {
    Form {
      Input(name: "search", label: "Search", onChange: updateFilters)
      Select(name: "store_id", label: "Store", options: fetchStores())
      DateInput(name: "from_date", label: "From Date")
      DateInput(name: "to_date", label: "To Date")
      // ORPHAN_FIELD: type
      // ORPHAN_FIELD: created_by
    }
  }

  Function updateFilters(e) {
    filters[e.target.name] = e.target.value
    onFilterChange(filters)
  }
}
// Notes covered: Provides filtering capabilities for the stock history view.