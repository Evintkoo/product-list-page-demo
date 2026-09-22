/**
 * Handles the creation of a new product in the Lumi ERP system.
 */
async function createProduct(formData) {
  // 1. Construct the payload by mapping form fields to the Product schema
  const productPayload = {
    sku: formData.sku,
    name: formData.name,
    description: formData.description,
    type: formData.type,
    brand: formData.brand,
    tags: formData.tags, // Expects JSON array/object
    product_code: formData.product_code,
    supplier_product_code: formData.supplier_product_code,
    supplier: formData.supplier,
    tax: formData.tax,
    tax_product_code: formData.tax_product_code,
    tax_unit_of_measure: formData.tax_unit_of_measure,
    company_supply_price: formData.company_supply_price,
    wholesale_price: formData.wholesale_price,
    wholesale_including_tax: formData.wholesale_including_tax,
    supply_price: formData.supply_price,
    retail_price: formData.retail_price,
    retail_including_tax: formData.retail_including_tax,
    mrp: formData.mrp,
    images: formatImages(formData), // Aggregates image_1-5, urls, and thumbnails
    attributes: formatAttributes(formData), // Aggregates attribute_1-6
    weight: formData.weight,
    volume: formData.volume,
    valid_from: formData.valid_from,
    valid_to: formData.valid_to,
    quick_button: formData.quick_button,
    quick_button_order: formData.quick_button_order,
    barcode_type: formData.barcode_type,
    stock_tracking: formData.stock_tracking,
    bundle_flexible: formData.bundle_flexible,
    bundle: formData.bundle,
    is_active: formData.is_active,
    internal_product: formData.internal_product,
    open_price: formData.open_price,
    can_order: formData.can_order,
    product_freeze: formData.product_freeze,
    warranty_period: formData.warranty_period,
    return_days_limit: formData.return_days_limit
  };

  // 2. Send request to API
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productPayload)
  });

  if (!response.ok) {
    throw new Error('Failed to create product');
  }

  return await response.json();
}

/**
 * Helper to aggregate image fields into the JSON structure
 */
function formatImages(data) {
  return [1, 2, 3, 4, 5].map(i => ({
    file: data[`image_${i}`],
    url: data[`image_url_${i}`],
    thumbnail: data[`thumbnail_url_${i}`]
  })).filter(img => img.file || img.url);
}

/**
 * Helper to aggregate attribute fields into the JSON structure
 */
function formatAttributes(data) {
  const attributes = {};
  [1, 2, 3, 4, 5, 6].forEach(i => {
    if (data[`attribute_${i}`]) {
      attributes[`attr_${i}`] = data[`attribute_${i}`];
    }
  });
  return attributes;
}