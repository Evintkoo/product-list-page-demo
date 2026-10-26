// Node: Product Tab Menu (0eedc09d-4b5d-4f4f-ad6b-637ada098dde)
// Asset: assets/6e5f4d92-5031-4c71-ad5d-1e561c6be354.svg
Component ProductTabMenu:
  Set activeTab = "Stock History"
  Render navigation tabs for Product details
  Notes covered: This component uses Product Tab Menu component with "Stock History" tab set as active.

// Node: Page Load Event (4f925e4a-2563-4277-8157-d85f1a94b36e)
Effect onMount:
  Call GET /api/stores
    On success: Populate Store dropdown with mapping:
      - store_id -> dropdown id
      - store_name -> dropdown value <!-- ORPHAN_FIELD: store_name -->
  Call GET /api/store-stock-histories
    On success: Populate StoreStockHistoryTable with mapping:
      - id -> ID
      - created_at -> Date
      - store_name -> Store <!-- ORPHAN_FIELD: store_name -->
      - type -> Type <!-- ORPHAN_FIELD: type -->
      - increasedQty -> Qty Changed <!-- ORPHAN_FIELD: increasedQty -->
      - decreasedQty -> Qty Changed <!-- ORPHAN_FIELD: decreasedQty -->
      - notes -> Notes <!-- ORPHAN_FIELD: notes -->
      - createdBy -> Created By <!-- ORPHAN_FIELD: createdBy -->
      - totalQtyChanged -> All Qty Changed <!-- ORPHAN_FIELD: totalQtyChanged -->
  Notes covered: Call the /api/store-stock-histories for a specific product and load the respective data. Map the JSON response to the result table with the following mapping rules. Call the /api/stores and load the respective data. Map the JSON response to the Store dropdown with the stores mapping rules.

// Node: Store Stock History Filter (aea19361-13ba-43a9-bddd-cf2a7718e0c2)
Component StockHistoryFilter:
  Inputs: Store (dropdown), Type (dropdown), From Date (date), To Date (date), Created By (dropdown), Search (text)
  On Search button click OR Table column header click:
    Trigger GET /api/store-stock-histories with query params:
      product_id, store_id, type, from_date, to_date, created_by, search
    Update StoreStockHistoryTable with response data using mapping rules defined in Page Load.
  Notes covered: Row of filter controls including Store, Type, From Date, To Date, and Created By dropdowns plus a search field to narrow the stock history list. Trigger the /api/store-stock-histories API call with related query params when the user click on Search button or click on the sortable table column header. Map the API response to the result table according to the mapping rules.

// Node: Store Stock History Table (96024191-9865-46db-9a21-5938e972a916)
Component StoreStockHistoryTable:
  Columns:
    - ID (id)
    - Date (created_at, sortable)
    - Store (store_name, sortable)
    - Type (type, sortable)
    - Qty Changed (increasedQty/decreasedQty)
    - Notes (notes)
    - Created By (createdBy, sortable)
  Features: Pagination, Sortable headers (asc, desc)
  Notes covered: Data table listing each stock change record for the selected product with pagination capability and the following column header: ID, Date, Store, Type, Qty Changed, Notes, Created By.

// Node: Products Menu (cd27a07d-cc8c-4760-9240-83ab03636be3)
Component ProductsMenu:
  Set activeTab = "Products"
  Notes covered: This component uses Products Menu component with "Products" tab set as active.

// Node: Main Menu (c5350205-988f-486f-8b33-1d43cb830996)
Component MainMenu:
  Set activeTab = "Products"
  Notes covered: This component uses Main Menu component with "Products" tab set as active.

// Node: Column Definitions (4fea5e89-d3c1-4011-9ffe-a1e161e9b024, c6609dd7-b3b5-479f-95c5-a6f5f31e6763, 06f0bf3d-c2e4-4aa1-8880-4b26313f9d60, ce7a06aa-06ee-4500-a7dc-056fc63ca527, 8ddf31c4-3c61-4abf-a173-0a25e68f7f78, d8f14b03-adfb-4697-80ec-22d0f3f30a6d, d11c82bc-0b86-4441-9999-d338270e5efc, b18ce193-51bb-4da2-adc2-723a48bf5dc2)
  - ID Column: Displays unique identifier.
  - Date Column: Displays timestamp.
  - Type Column: Displays change type (e.g., restock, sale); clickable (no action).
  - Qty Changed Column: Displays signed number (e.g., +2, -5).
  - Notes Column: Displays free-text.
  - Store Column: Displays store name.
  - All Qty Changed: Displays total quantity change from filtered results.
  - Created By Column: Displays user who recorded transaction.
  Notes covered: All column descriptions and the total quantity changed requirement.