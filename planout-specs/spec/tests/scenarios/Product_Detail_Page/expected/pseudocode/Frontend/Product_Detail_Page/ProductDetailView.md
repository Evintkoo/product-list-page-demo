// Node: (d9ab555c-1d53-4d63-bd14-48e9a776e638)
// Triggered by: Page Load (c16a1ff1-fcc6-41ef-849d-882afe172acb)
// Action: GET /api/products/:id
// Logic: Fetch product data using the ID from the URL path parameter.
// Happy Path: Render component tree with fetched data.
// Error State: Display error notification if API returns 4xx/5xx.
// Empty State: Show skeleton loaders while awaiting response.
// Notes covered: None (Structural node)

// Node: Mapping Rules (034f6eb8-63ad-4a09-bade-d9e20d2a5e67)
// Input: Product object from GET /api/products/:id
// Logic: Map fields to UI rows.
// LEFT Column:
// - SKU: sku (with copy-to-clipboard action)
// - Name: product_name
// - Description: description
// - Brand: brand (Format: 'CODE - NAME')
// - Type: type (Format: 'CODE - NAME')
// - Tags: tags
// - Product Code: product_code
// - Supplier Product Code: supplier_product_code
// - Suppliers: suppliers (Label: 'All Suppliers')
// - Tax: tax (Label: 'PPN')
// - Tax Product Code: tax_product_code
// - Tax Unit Of Measure: tax_unit_of_measure
// - Company Supply Price (IDR): company_supply_price
// - Wholesale Price (IDR): wholesale_price (+Inc Tax)
// - Supply Price (IDR): supply_price
// - Retail Price (IDR): retail_price (+Inc Tax)
// - MRP (IDR): mrp
// - Stock Tracking: is_stock_tracked (icon flag)
// - Bundle Flexible: is_bundle_flexible (icon flag)
// - Bundle: is_bundle (icon flag)
// RIGHT Column:
// - Created At: created_at
// - Updated At: updated_at
// - Updated By: updated_by
// - Kategori Item: category
// - Unit Bisnis: business_unit
// - Tipe Mobil: car_type
// - Attribute 4: attribute_4
// - Attribute 5: attribute_5
// - Attribute 6: attribute_6
// - Weight (Gram): weight_gram
// - Volume (Mililiter): volume_ml
// - Valid From: valid_from
// - Valid To: valid_to
// - Barcode Type: barcode_type (Default: 'code128')
// - Active: is_active (icon flag)
// - Is Internal: is_internal (icon flag)
// - Open Price: is_open_price (icon flag)
// - Can Order: can_order (icon flag)
// - Product Freeze: is_frozen (icon flag)
// - Warranty Period: warranty_period
// - Return Days Limit: return_days_limit
// - Trade In (Rp): trade_in
// Notes covered: All mapping rules listed in description.

// Node: Product Details JSON Schema (84a9ac74-afa9-4b7c-a17f-7c97f63f92dc)
// Logic: Enforce data integrity based on schema properties.
// Validation: 
// - Required fields: SKU, productName, brand, type, category, tax, companySupplyPrice, wholesalePrice, mrp, businessUnit, warrantyPeriodDays.
// - Images: Array, max 5 items, position 1-5, imageUrl (uri), thumbnailUrl (uri).
// - BarcodeType: Enum [code128, code39, ean13, qr].
// Notes covered: All schema constraints and required fields.

// Node: Product Tab (eb267d6b-3e47-4b1e-b506-b48be3fe53ea)
// Logic: Navigation component for product-related sub-pages.
// Asset: assets/adba229c-083f-44ef-8266-5500bc46aee5.svg
// Notes covered: Redirects to respective pages.

// Node: Dimension (159c7be8-5787-49bc-b3c4-333c1294ba18)
// Logic: Read-only card displaying physical dimensions.
// Notes covered: Read only card of physical dimensions.

// Node: Header Navigation Bar (f90cc08d-9fa9-499a-b006-d02fd9586e9a)
// Logic: Sticky header with "Products" tab active.
// Next: Main Menu (83292927-8a5b-434c-9116-cb45794018ba)
// Notes covered: Sticky positioning, Main Menu component, Products tab active.

// Node: Details Card (7319c217-54c3-45dc-a3b2-fa66acb824b5)
// Logic: Read-only card for core identity fields.
// Notes covered: Read only card of core identity fields.