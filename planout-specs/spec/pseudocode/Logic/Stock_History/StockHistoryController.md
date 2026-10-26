/**
 * Handles retrieval of store and stock history data.
 */

// Node: Page Load Event (e26be39c-3cb8-48d1-b6ad-bb05e577e7b8)
// Receives: Trigger from Frontend Page Load
// Actions: 
// 1. Fetch /api/stores to populate Store dropdown.
// 2. Fetch /api/store-stock-histories for the specific product.
// Notes covered: Call the /api/store-stock-histories for a specific product and load the respective data, Call the /api/stores and load the respective data.

// Node: Store Mapping Rules (a40ede3c-69fc-46cc-b768-86dba39bccea)
// Logic: Map Store entity fields to UI components
// 1. Store.id -> dropdown id
// 2. Store.name -> dropdown value
// Notes covered: store_id -> dropdown id, store_name -> dropdown value <!-- MISSING_FIELD: Store.store_name -->

// Node: Store Stock History Mapping Rules (1290b371-6610-4521-b7f4-97cd5fa7b980)
// Logic: Map StockHistory entity fields to Table columns
// 1. StockHistory.id -> ID
// 2. StockHistory.created_at -> Date
// 3. Store.name -> Store <!-- MISSING_FIELD: Store.name -->
// 4. Type -> Type <!-- MISSING_FIELD: StockHistory.type -->
// 5. increasedQty -> Qty Changed <!-- MISSING_FIELD: StockHistory.increasedQty -->
// 6. decreasedQty -> Qty Changed <!-- MISSING_FIELD: StockHistory.decreasedQty -->
// 7. StockHistory.reason -> Notes
// 8. CreatedBy -> Created By <!-- MISSING_FIELD: StockHistory.createdBy -->
// 9. totalQtyChanged -> All Qty Changed <!-- MISSING_FIELD: StockHistory.totalQtyChanged -->
// Notes covered: id -> ID, created_at -> Date, store_name -> Store, type -> Type, increasedQty -> Qty Changed, decreasedQty -> Qty Changed, notes -> Notes, createdBy -> Created By, totalQtyChanged -> All Qty Changed

// Node: Store Stock History Filter (e45b21ac-fb53-44ee-a116-9b6304993bc0)
// Receives: Search button click or table header sort click from Frontend
// Actions:
// 1. Capture query params: Store, Type, From Date, To Date, Created By, and search field.
// 2. Execute GET /api/store-stock-histories with these filters.
// 3. Return filtered results to Frontend for mapping.
// Notes covered: Row of filter controls including Store, Type, From Date, To Date, and Created By dropdowns plus a search field to narrow the stock history list, Trigger the /api/store-stock-histories API call with related query params when the user click on Search button or click on the sortable table column header, Map the API response to the result table according to the mapping rules.