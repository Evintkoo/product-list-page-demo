// State Management:
// All fields below share a local state object `filterParams` initialized to empty strings/nulls.
// Validation: Immediate visual feedback (e.g., border-color change) if input exceeds character limits.

// Unit: Apply Search Button (2bb5371a-f117-403d-a2c1-f781f06f5018)
// Description: Blue button with checkmark icon. Triggers filter query.
// Happy Path: On click, serializes `filterParams` and dispatches search event.
// Validation: Disabled if all fields are empty.
// Notes covered: Blue button, checkmark icon, runs filter query using current field values.
Asset: assets/a8d0aaca-932a-4403-93e7-fd2cd8ae57d2.svg

// Unit: Item Category Text Field (443f7565-e88a-4ae6-86d0-dc657804da31)
// Description: Text field for category name/code.
// State: `filterParams.item_category` <!-- ORPHAN_FIELD: item_category -->
// Notes covered: Text field, filtering by item category, end of top row, sized for category name/code.

// Unit: Tags Selection (bb5b4693-afce-41b1-8e8c-c96b8dfbaecb)
// Description: Compact field with icon for multi-tag selection.
// State: `filterParams.tags` <!-- ORPHAN_FIELD: tags -->
// Notes covered: Tag selector, compact field with icon, pick one or more tags.

// Unit: Tax Selection (80f6f035-292f-4814-8966-f4ed2b5deaca)
// Description: Dropdown with chevron, narrower than brand/type.
// State: `filterParams.tax_rate` <!-- ORPHAN_FIELD: tax_rate -->
// Notes covered: Dropdown selector, tax rate or category, chevron arrow, narrower than brand/type.

// Unit: Product Type Selection (f4272081-edd0-49c0-8a53-ca4a3a032758)
// Description: Dropdown with chevron for product types.
// State: `filterParams.product_type` <!-- ORPHAN_FIELD: product_type -->
// Notes covered: Dropdown selector, filtering by type, chevron arrow, opens list of types.

// Unit: Product Brand Selection (0c35c524-ff92-40f8-a204-bafd3ff4fae9)
// Description: Dropdown with chevron for brand options.
// State: `filterParams.brand` <!-- ORPHAN_FIELD: brand -->
// Notes covered: Dropdown selector, filtering by brand, chevron arrow, list of brand options, no free text.

// Unit: Product Code Text Form (679d4f90-1b63-469f-bbb8-1c53c28ba531)
// Description: Text input for product code.
// State: `filterParams.product_code` <!-- ORPHAN_FIELD: product_code -->
// Notes covered: Text input, enter product code, third in top row, plain text style, no dropdown.

// Unit: Name Text Form (6d4d99e1-0fa6-4129-90f1-7e1f750d2254)
// Description: Text input for product name.
// State: `filterParams.name` <!-- ORPHAN_FIELD: name -->
// Notes covered: Text input, filter bar, type product name, second in row, wider than SKU field.