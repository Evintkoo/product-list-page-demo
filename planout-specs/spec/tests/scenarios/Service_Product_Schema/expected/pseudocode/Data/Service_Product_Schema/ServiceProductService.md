// Orchestrates data transformation for API responses.

FUNCTION getFormPayload(id = null):
  IF id:
    product = ServiceProductRepository.getServiceProductById(id)
  ELSE:
    product = { price: 0, including_tax: false, open_price: false, active: true, open_estimated_time: false }
  
  RETURN {
    service_product: product,
    type_options: DB.ServiceProductTypes.all(),
    tag_options: DB.Tags.all(),
    tax_options: DB.Finance.getTaxes(),
    other_tax_options: DB.Finance.getTaxes(),
    other_tax_account_options: DB.Finance.getCoas(),
    other_tax_refund_account_options: DB.Finance.getCoas(),
    tax_product_code_options: DB.Finance.getTaxProductCodes(is_goods: false),
    tax_unit_of_measure_options: DB.Finance.getTaxUoms()
  }

FUNCTION getDetailPayload(id):
  product = ServiceProductRepository.getServiceProductById(id)
  // Map internal IDs to display labels and calculate derived fields
  RETURN {
    ...product,
    service_product_type: product.Type.name,
    service_product_tags: product.Tags.map(t => t.name).join(", "),
    tax_rate: product.Tax.rate,
    tax_name: product.Tax.name,
    other_tax_rate: product.OtherTax.rate,
    other_tax_name: product.OtherTax.name,
    price_ex_tax: calculateExTax(product.price, product.including_tax, product.Tax.rate),
    created_by: formatUser(product.Creator),
    updated_by: formatUser(product.Updater)
  }