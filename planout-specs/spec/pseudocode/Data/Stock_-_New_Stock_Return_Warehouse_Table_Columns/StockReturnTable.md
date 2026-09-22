// The StockReturnTable component manages the state of the return items list.
// It utilizes the StockReturnItem schema to structure the data rows.

COMPONENT StockReturnTable:
  STATE items: List<StockReturnItem> = []

  FUNCTION handleAddRow(productData):
    NEW_ROW = {
      product_id: productData.id,
      store_qty: productData.current_stock,
      return_qty: 0,
      type: "",
      reason: ""
    }
    APPEND NEW_ROW TO items

  RENDER:
    TABLE:
      HEADERS: ["Product", "Store Qty", "Return Qty", "Type", "Reason"]
      FOR EACH row IN items:
        ROW:
          CELL: ProductSearchInput(onSelect: handleAddRow)
          CELL: row.store_qty (Read-only)
          CELL: Input(type: number, value: row.return_qty, onChange: updateRow)
          CELL: Select(options: ["Damaged", "Expired", "Overstock"], onChange: updateRow)
          CELL: Input(type: text, value: row.reason, onChange: updateRow)