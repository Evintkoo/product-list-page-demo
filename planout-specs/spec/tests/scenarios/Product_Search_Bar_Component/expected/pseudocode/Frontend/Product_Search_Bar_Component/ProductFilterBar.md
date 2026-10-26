/**
 * Component: ProductFilterBar
 * Renders the filter card containing various search and filter inputs for the product page.
 * Asset: assets/a8d0aaca-932a-4403-93e7-fd2cd8ae57d2.svg
 */

// State Management:
// Local state object `filterCriteria` initialized with empty values for all fields.
// Fields: 
// - SKU <!-- ORPHAN_FIELD: sku -->
// - Name <!-- ORPHAN_FIELD: name -->
// - ProductCode <!-- ORPHAN_FIELD: product_code -->
// - Brand <!-- ORPHAN_FIELD: brand -->
// - ProductType <!-- ORPHAN_FIELD: product_type -->
// - Tax <!-- ORPHAN_FIELD: tax_rate -->
// - Tags <!-- ORPHAN_FIELD: tags -->
// - ItemCategory <!-- ORPHAN_FIELD: item_category -->

// Node: SKU Text Form (id: f7675d92-a79d-49ab-88f2-c1619ea3b16d)
// Description: Narrow text input at the start of the bar.
// Validation: Immediate check for alphanumeric characters.
// Notes covered: Narrow text input, start of bar, SKU value, plain field, small icon, no dropdown, sized for short codes.

// Node: Name Text Form (id: 6d4d99e1-0fa6-4129-90f1-7e1f750d2254)
// Description: Text input for product name, wider than SKU.
// Validation: None (free text).
// Notes covered: Text input, filter bar, product name, second in row, wider than SKU.

// Node: Product Code Text Form (id: 679d4f90-1b63-469f-bbb8-1c53c28ba531)
// Description: Text input for product code, third in row.
// Validation: None (free text).
// Notes covered: Text input, product code, third in row, plain text style, no dropdown.

// Node: Product Brand Selection (id: 0c35c524-ff92-40f8-a204-bafd3ff4fae9)
// Description: Dropdown for brand selection.
// Validation: Selection must be from the provided list.
// Notes covered: Dropdown selector, brand, chevron arrow icon, list of brand options, no free text.

// Node: Product Type Selection (id: f4272081-edd0-49c0-8a53-ca4a3a032758)
// Description: Dropdown for product type.
// Validation: Selection must be from the provided list.
// Notes covered: Dropdown selector, product type, chevron arrow, list of selectable types.

// Node: Tax Selection (id: 80f6f035-292f-4814-8966-f4ed2b5deaca)
// Description: Dropdown for tax rate/category.
// Validation: Selection must be from the provided list.
// Notes covered: Dropdown selector, tax rate or category, chevron arrow, narrower than brand/type dropdowns.

// Node: Tags Selection (id: bb5b4693-afce-41b1-8e8c-c96b8dfbaecb)
// Description: Compact tag selector.
// Validation: Multi-select allowed.
// Notes covered: Tag selector, compact field, icon, pick one or more tags.

// Node: Item Category Text Field (id: 443f7565-e88a-4ae6-86d0-dc657804da31)
// Description: Text field for category at the end of the row.
// Validation: None (free text).
// Notes covered: Text field, item category, end of top filter row, sized for name or code.

// Node: Apply Search Button (id: 2bb5371a-f117-403d-a2c1-f781f06f5018)
// Description: Blue button with checkmark icon.
// Action: Triggers query using current `filterCriteria` state.
// Notes covered: Blue Apply Search button, below filter fields, checkmark icon, clicks to run filter query, uses current field values.

// Logic Flow:
// 1. User interacts with any input field -> Updates `filterCriteria` state immediately.
// 2. User clicks "Apply Search Button" -> Executes search function with `filterCriteria`.
// 3. Empty State: All fields default to null/empty string; search returns all products.
// 4. Error State: If validation fails on text fields, highlight field in red (visual feedback).