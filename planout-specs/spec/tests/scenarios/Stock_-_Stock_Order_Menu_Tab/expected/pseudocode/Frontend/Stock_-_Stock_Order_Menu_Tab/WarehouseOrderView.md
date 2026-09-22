/**
 * Component: WarehouseOrderView
 * Displays the list of warehouse stock orders and the creation trigger.
 */

Component WarehouseOrderView:
  Render:
    Header:
      Title: "Warehouse Stock Orders"
      
      // Primary Action Button
      Button(label: "+ New Stock Order", variant: "primary"):
        OnClick:
          OpenModal(CreateStockOrderModal)

    // List component rendering persisted data
    StockOrderListTable:
      // Data source derived from schema entities
      // Fields: (No schema entities defined in context, 
      // ensure integration with backend list endpoint)