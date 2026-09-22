// Logic to fetch the specific product and all required lookup tables for the form

function getServiceProductEditData(productId) {
  // 1. Fetch the primary record
  const product = db.ServiceProduct.findById(productId);
  if (!product) {
    throw new Error("NOT_FOUND");
  }

  // 2. Fetch all dropdown options concurrently
  const [types, tags, taxCodes, unitsOfMeasure] = await Promise.all([
    db.ServiceProductType.findAll(),
    db.ServiceProductTag.findAll(),
    db.TaxProductCode.findAll(),
    db.TaxUnitOfMeasure.findAll()
  ]);

  // 3. Return combined object for the API response
  return {
    service_product: product,
    options: {
      types,
      tags,
      tax_product_codes: taxCodes,
      tax_units_of_measure: unitsOfMeasure
    }
  };
}