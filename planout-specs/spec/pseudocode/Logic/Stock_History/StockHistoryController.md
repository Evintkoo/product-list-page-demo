/**
 * Orchestrates the page load and filter interactions.
 */
class StockHistoryController {
  
  async onPageLoad(productId: string) {
    // 1. Load stores for the filter dropdown
    const stores = await getStores();
    this.updateStoreDropdown(stores);

    // 2. Load initial stock history for the product
    const history = await getStockHistory(productId, {});
    this.renderTable(history);
  }

  async onSearch(productId: string, filterCriteria: object) {
    // Triggered by Search button or column sort
    const history = await getStockHistory(productId, filterCriteria);
    this.renderTable(history);
  }

  renderTable(data: Array<StockHistory>) {
    const rows = data.map(item => ({
      id: item.id,
      date: item.created_at,
      store: item.store_name, // Assumes join or lookup resolution
      type: item.type,
      qtyChanged: item.increasedQty > 0 ? item.increasedQty : item.decreasedQty,
      notes: item.notes,
      createdBy: item.createdBy,
      allQtyChanged: item.totalQtyChanged
    }));
    
    this.updateUIComponent("StockHistoryTable", rows);
  }
}