/**
 * Main Product List Page Component
 * Asset: assets/67ab07a3-36e5-4169-bc37-60c90863d1d8.svg
 */

// 1. Table Header Row (a52c5866-d624-4665-a90a-94bf57838178)
// Sticky header containing columns: Name, Status, Price, Stock.
// Each column has a sort caret.
// Interaction: Click once for Ascending, click again for Descending.
// Notes covered: Sticky header with sortable column titles like name, status, price, and stock, each with a sort caret. When the user click it, then ti will sort the items from Ascending first, clicking it again will reverse the sort to Descending first

// 2. Row Selector (f08f1b35-c9c2-45a0-945d-4201dd8f7803)
// First and second columns contain hypertext links.
// Interaction: Redirects to product details page.
// Notes covered: first and second column table column holding the row hypertext, it will redirect to the corresponding product details page

// 3. Transition to add product (61afc42c-5a1a-4a09-820c-207d05aa1aaf)
// Button component that triggers navigation to the "Add Product" page.
// Notes covered: When this button is clicked, move to add product page

// 4. Sub Menu (c1c858d6-25cc-456c-9afd-9e8c6dd93101)
// Sub Menu component with "Products" tab set as active.
// Notes covered: This component uses Sub Menu component with "Products" tab set as active.

// 5. Search Button (f18a757e-4dbf-433a-8f69-7c0217c914d8)
// Blue button with checkmark icon.
// Interaction: Triggers search API call using current field values from Search Text Fields.
// Notes covered: Below the filter bar sits a blue Apply Search button with a checkmark icon that the user clicks to run the filter query using the current field values, this will call the search product API and then return list of product JSON Schema

// 6. Search Text Fields (09a9cf44-1f8b-4c1e-98f4-a6fc7efe121f)
// Filter bar inputs:
// - SKU (text) <!-- ORPHAN_FIELD: SKU -->
// - productName (text) <!-- ORPHAN_FIELD: productName -->
// - productCode (text) <!-- ORPHAN_FIELD: productCode -->
// - brand (dropdown) <!-- ORPHAN_FIELD: brand -->
// - product type (dropdown) <!-- ORPHAN_FIELD: productType -->
// - tax (dropdown) <!-- ORPHAN_FIELD: tax -->
// - tags (selector) <!-- ORPHAN_FIELD: tags -->
// - item category (text) <!-- ORPHAN_FIELD: itemCategory -->
// Notes covered: The filter bar contains SKU, name, and product code text inputs, brand, product type, and tax dropdowns, a tags selector, an item category text field, and the Apply Search button.

// 7. Page Load (1a2d71da-1b77-49db-aaf9-1e22fd5d7880)
// On mount, call GET /products.
// Map response fields to UI:
// - SKU -> SKU
// - productName -> Name
// - brandName -> Brand
// - productCode -> Product Code
// - tax -> Tax
// - price -> Price
// Notes covered: During page load, call the /api/products and load the respective data. Map the JSON response with the following mapping rules. 1. SKU -> SKU, 2. productName -> Name, 3. brandName -> Brand, 4. productCode -> Product Code, 5. tax -> Tax, 6. price -> Price

// 8. Table Columns (cfa19c08-b1c0-43c1-a7a8-ec039d7cbc6b, 183c4335-8965-4c35-918f-f2b6e06bffd3, 9e425353-2aef-4121-8dbe-e423a2aeda90, 6a43abed-d3bd-47b7-9a8e-52c188ee21e8, 47ae5be1-126a-4754-9e83-14063f13935d, 9c2ba9f1-4914-4fe7-972f-7f3e7b5b66ec)
// Tax Column: Displays tax rate.
// Price Column: Displays price + filter dropdown.
// Item Name Column: Displays productName + sort chevron.
// Product Brand Column: Displays brandName.
// Product Code Column: Displays productCode.
// SKU Column: Displays SKU.
// Notes covered: Tax column displays applicable tax rate. Price column shows price and filter dropdown. Item Name column shows name with sort chevron. Product Brand column shows brand. Product Code column shows internal code. SKU column shows unique SKU.

// 9. Main menu (3efa8f68-3fa1-41a3-b7ce-d12bc6d383f6)
// Navigation component connecting to Common Component.
// Notes covered: This main menu will connect to the Common Component