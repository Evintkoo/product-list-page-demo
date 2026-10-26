// Node ID: 15e861a8-4d8a-4b24-9bd5-aa193c6e6baf
// Description: Filter controls for the warehouse stock table.
// Fields: 
//   - warehouse_id (Dropdown) <!-- ORPHAN_FIELD: warehouse_id -->
//   - warehouse_name (Text input) <!-- ORPHAN_FIELD: warehouse_name -->
//   - warehouse_code (Text input) <!-- ORPHAN_FIELD: warehouse_code -->
// Logic: Changes to inputs update local state only. The table data is only refreshed upon clicking the "Search" button.
// Notes covered: the filter bar sits above the table and lets the user narrow down which warehouse rows are shown. It has three filters: a Warehouse dropdown to pick one warehouse, a Name field, and a Warehouse Code field. Changing a filter doesn't update the list on its own; nothing happens until the Search button is clicked.