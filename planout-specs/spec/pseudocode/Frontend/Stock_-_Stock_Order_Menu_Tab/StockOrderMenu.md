/**
 * Component: StockOrderMenu
 * Renders a tabbed navigation interface for Stock Order categories.
 * Each tab routes the user to the corresponding list view.
 */

Component StockOrderMenu:
  State activeTab: String (Default: "Warehouse")

  Render:
    NavigationContainer:
      // Warehouse Tab
      TabItem(label: "Warehouse", active: activeTab == "Warehouse"):
        Asset: assets/754c70dc-25a2-4691-9b68-8ef22f80f727.svg
        OnClick: 
          Set activeTab = "Warehouse"
          NavigateTo("/stock/warehouse-orders") // ORPHAN_FIELD: path_warehouse_list

      // Sales Retail Tab
      TabItem(label: "Sales Retail", active: activeTab == "Sales Retail"):
        Asset: assets/abfb3735-672f-4932-9b32-bb74f059cc92.svg
        OnClick: 
          Set activeTab = "Sales Retail"
          NavigateTo("/stock/sales-retail-orders") // ORPHAN_FIELD: path_sales_retail_list

      // Service Orders Tab
      TabItem(label: "Service Orders", active: activeTab == "Service Orders"):
        Asset: assets/c33e5555-7ea9-40a6-a6b9-5a177ae69255.svg
        OnClick: 
          Set activeTab = "Service Orders"
          NavigateTo("/stock/service-orders") // ORPHAN_FIELD: path_service_orders_list

      // Work Orders Tab
      TabItem(label: "Work Orders", active: activeTab == "Work Orders"):
        Asset: assets/ae8fb918-0ae8-4b48-80b5-e3414280e888.svg
        OnClick: 
          Set activeTab = "Work Orders"
          NavigateTo("/stock/work-orders") // ORPHAN_FIELD: path_work_orders_list