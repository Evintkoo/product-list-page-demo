// Node: Product Tab Menu (0eedc09d-4b5d-4f4f-ad6b-637ada098dde)
// Asset: assets/6e5f4d92-5031-4c71-ad5d-1e561c6be354.svg
Component ProductTabMenu:
  Render tabs with "Stock History" set as active state.
  On selection, navigate to the stock history view.
  Notes covered: This component uses Product Tab Menu component with "Stock History" tab set as active.

// Node: Page Load Event (4f925e4a-2563-4277-8157-d85f1a94b36e)
Effect onMount:
  1. Call GET /api/store-stock-histories (params: product_id from context).
  2. Call GET /api/stores.
  3. On success, populate Store dropdown and Stock History table using mapping rules.
  4. Handle empty state: Display "No records found" if response is empty.
  Notes covered: During page load, do the following; Call the /api/store-stock-histories for a specific product; Call the /api/stores and load the respective data.

// Node: Store Stock History Filter (aea19361-13ba-43a9-bddd-cf2a7718e0c2)
Component StockHistoryFilter:
  Inputs: Store (dropdown), Type (dropdown), From Date (date), To Date (date), Created By (dropdown), Search (text).
  Action: On "Search" button click or table header sort, trigger GET /api/store-stock-histories.
  Query Params: product_id, store_id, type, from_date, to_date, created_by, search.
  Notes covered: Row of filter controls including Store, Type, From Date, To Date, and Created By dropdowns plus a search field; Trigger the /api/store-stock-histories API call with related query params when the user click on Search button or click on the sortable table column header.

// Node: ID Column (4fea5e89-d3c1-4011-9ffe-a1e161e9b024)
Component IDColumn:
  Display: StockHistory.id
  Notes covered: A unique identifier for the inventory change record.

// Node: Date Column (c6609dd7-b3b5-479f-95c5-a6f5f31e6763)
Component DateColumn:
  Display: StockHistory.created_at
  Notes covered: The timestamp when the quantity change occurred.