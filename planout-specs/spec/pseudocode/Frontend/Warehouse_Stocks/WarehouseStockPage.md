// Node ID: 42805dd1-5e99-40ff-b992-c365a7c367c8
// Asset: assets/a79623e2-069b-4044-9a3a-6af563504375.svg
// Description: Page load initialization for warehouse stock data.
// API Call: GET /products/:id/warehouse-stocks
// Mapping Rules:
//   - row index -> No
//   - warehouse_code -> Code
//   - warehouse_name -> Warehouse
//   - inventory_quantity -> Qty
//   - available_quantity -> Qty Available
//   - reserved_quantity -> Reserved
//   - in_transit_quantity -> In Transit
//   - min_quantity -> Min Qty
//   - max_quantity -> Max Qty
//   - average_cost -> Average Cost (Rp)
//   - total_cost -> Total Cost (Rp)
//   - total_quantity -> Total Qty (summary) <!-- ORPHAN_FIELD: total_quantity -->
// Notes covered: During page load, call GET /api/products/:id/warehouse-stocks and load the respective data. Map the JSON response with the following mapping rules.