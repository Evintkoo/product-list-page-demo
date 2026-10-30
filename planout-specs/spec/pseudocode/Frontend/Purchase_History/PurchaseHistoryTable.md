// Node: 6b026891-3040-4a9e-8b89-70582705c7ea (Empty/Container)
// Description: Container for the purchase history data grid.
// Asset: assets/5f296374-83c4-4b33-804f-f15d049e3c4e.svg
// Notes covered: None (Placeholder node)

// Node: Search (03f5c2e8-e5ab-429f-b6a4-30720d01ad88)
// Description: Search action button. Triggers GET /products/:id/purchases with supplier filter.
// Logic: On click, filter state (from Supplier filter dropdown) is applied to the API call.
// Side Effects: Reloads table data.
// Notes covered: Search action button, Performs search using selected supplier filter, Table reloads based on criteria.

// Node: Price (38b7f640-8af7-43aa-b560-24de4ced9d24)
// Description: Column displaying unit_price.
// Data: Maps to PURCHASE.unit_price.
// Notes covered: The unit price of the item for each transaction is displayed in this column.

// Node: Quantity (01f4365f-f887-498f-87e8-cfd18c1ff373)
// Description: Column displaying quantity.
// Data: Maps to PURCHASE.quantity.
// Notes covered: Displays the quantity of items purchased in each transaction, Numerical unit count helps users see number of items.

// Node: Date (65bd7b99-65f0-4fa4-a53f-1ea4714b3d5e)
// Description: Column header for purchase_date.
// Interaction: Clickable, triggers local sort.
// UI: Features small arrow icon for sort state.
// Notes covered: Header for transaction date column, Clickable, Features small arrow icon indicating sort capability.

// Node: Purchase Delivery (732b0dba-588f-4616-931c-f085b24bebd7)
// Description: Column for delivery document identifier.
// Data: <!-- ORPHAN_FIELD: purchase_delivery_number -->
// Notes covered: Column indicating that the value below it is a purchase delivery document number.