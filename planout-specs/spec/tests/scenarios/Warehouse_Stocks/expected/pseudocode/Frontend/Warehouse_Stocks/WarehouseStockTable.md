// Node: Code Column (54768f74-ccb5-4def-81a0-2ea535d89faa)
// Asset: assets/a79623e2-069b-4044-9a3a-6af563504375.svg
// Displays `warehouse_code` from Stock entity.
// Notes covered: 1. warehouse_code -> Code

// Node: No. Column (2138b11f-4111-4328-91a6-e89c5777b409)
// Displays sequential row index (1-based).
// Notes covered: 1. (row index) -> No

// Node: max qty (57d00d33-0609-4504-81f3-8fc4c358833c)
// Displays `max_quantity` from Stock entity.
// Inline-editable: triggers edit mode on click.
// Validation: Must be numeric, non-negative.
// Notes covered: 1. max_quantity -> Max Qty, 2. inline-editable, 3. caps how much should be held

// Node: average cost column (00871cf7-dd31-4abb-9fd5-648d36d7fcdb)
// Displays `average_cost` formatted as currency (Rp).
// Notes covered: 1. average_cost -> Average Cost (Rp)

// Node: total cost column (4c286aa0-2ce6-4dec-b800-2562ef83b27b)
// Displays `total_cost` calculated as `inventory_quantity` * `average_cost`.
// Notes covered: 1. total_cost -> Total Cost (Rp), 2. calculated as Qty × Average Cost

// Node: barcode page (3e5dfe8c-3c03-4f7e-bcc1-9a91c98f544a)
// Button triggers navigation to barcode printing page.
// Notes covered: 1. redirects to a barcode page, 2. used to print the product barcode

// Node: Total qty summary (66a157c5-5986-496f-82c9-df0daafabebd)
// Displays `total_quantity` <!-- ORPHAN_FIELD: total_quantity -->
// Note: This field is not in the provided DATA SCHEMAS or API PAYLOADS.
// Notes covered: 1. sits above the table, 2. shows total stock quantity across all warehouses, 3. display-only, 4. comes from total_quantity value, 5. full total across every warehouse