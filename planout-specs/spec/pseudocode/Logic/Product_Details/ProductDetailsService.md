/**
 * Fetches the full product details for the Product Details page.
 * Maps the raw database entity to the UI-specific display structure.
 */
async function getProductDetails(productId: string) {
  // Fetch product data from the API
  const response = await fetch(`/api/products/${productId}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }

  const product = await response.json();

  // Map the Product entity fields to the UI display requirements
  // Note: Fields not in the schema are marked as missing
  return {
    sku: product.sku,
    product_name: product.name,
    description: product.description,
    category: product.category_id, // Resolves to Category name via lookup
    created_at: product.created_at,
    updated_at: product.updated_at,
    
    // Missing fields required by the UI mapping rules:
    brand: "<!-- MISSING_FIELD: Product.brand -->",
    type: "<!-- MISSING_FIELD: Product.type -->",
    tags: "<!-- MISSING_FIELD: Product.tags -->",
    product_code: "<!-- MISSING_FIELD: Product.product_code -->",
    supplier_product_code: "<!-- MISSING_FIELD: Product.supplier_product_code -->",
    suppliers: "<!-- MISSING_FIELD: Product.suppliers -->",
    tax: "<!-- MISSING_FIELD: Product.tax -->",
    tax_product_code: "<!-- MISSING_FIELD: Product.tax_product_code -->",
    tax_unit_of_measure: "<!-- MISSING_FIELD: Product.tax_unit_of_measure -->",
    company_supply_price: "<!-- MISSING_FIELD: Product.company_supply_price -->",
    wholesale_price: "<!-- MISSING_FIELD: Product.wholesale_price -->",
    supply_price: product.price,
    retail_price: "<!-- MISSING_FIELD: Product.retail_price -->",
    mrp: "<!-- MISSING_FIELD: Product.mrp -->",
    is_stock_tracked: product.stock_quantity !== null,
    is_bundle_flexible: "<!-- MISSING_FIELD: Product.is_bundle_flexible -->",
    is_bundle: "<!-- MISSING_FIELD: Product.is_bundle -->",
    updated_by: "<!-- MISSING_FIELD: Product.updated_by -->",
    business_unit: "<!-- MISSING_FIELD: Product.business_unit -->",
    car_type: "<!-- MISSING_FIELD: Product.car_type -->",
    attribute_4: "<!-- MISSING_FIELD: Product.attribute_4 -->",
    attribute_5: "<!-- MISSING_FIELD: Product.attribute_5 -->",
    attribute_6: "<!-- MISSING_FIELD: Product.attribute_6 -->",
    weight_gram: "<!-- MISSING_FIELD: Product.weight_gram -->",
    volume_ml: "<!-- MISSING_FIELD: Product.volume_ml -->",
    valid_from: "<!-- MISSING_FIELD: Product.valid_from -->",
    valid_to: "<!-- MISSING_FIELD: Product.valid_to -->",
    barcode_type: "<!-- MISSING_FIELD: Product.barcode_type -->",
    is_active: "<!-- MISSING_FIELD: Product.is_active -->",
    is_internal: "<!-- MISSING_FIELD: Product.is_internal -->",
    is_open_price: "<!-- MISSING_FIELD: Product.is_open_price -->",
    can_order: "<!-- MISSING_FIELD: Product.can_order -->",
    is_frozen: "<!-- MISSING_FIELD: Product.is_frozen -->",
    warranty_period: "<!-- MISSING_FIELD: Product.warranty_period -->",
    return_days_limit: "<!-- MISSING_FIELD: Product.return_days_limit -->",
    trade_in: "<!-- MISSING_FIELD: Product.trade_in -->"
  };
}