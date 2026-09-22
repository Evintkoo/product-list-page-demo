/**
 * Handles the initialization of the Product Edit page.
 * @param productId - The UUID of the product to edit.
 */
async function initializeProductEditPage(productId: string) {
  // 1. Authenticate user
  const authResponse = await fetch("/api/auth/me");
  if (!authResponse.ok) {
    window.location.href = "/login";
    return;
  }

  // 2. Fetch product details
  const productResponse = await fetch(`/api/products/${productId}`);
  if (productResponse.status === 404) {
    handleNotFound();
    return;
  }

  const productData = await productResponse.json();
  
  // 3. Populate form fields using mapping rules
  populateForm(productData);
}

/**
 * Handles the submission of the product edit form.
 * @param productId - The UUID of the product being updated.
 * @param formData - The current state of the form fields.
 */
async function handleSaveProduct(productId: string, formData: any) {
  const payload = {
    SKU: formData.SKU,
    productName: formData.name,
    productDescription: formData.description,
    type: formData.type,
    brand: formData.brand,
    tag: formData.tag,
    supplierProductCode: formData.supplierProductCode,
    supplierId: formData.supplierId,
    tax: formData.tax,
    taxProductCodeId: formData.taxProductCodeId,
    taxUomId: formData.taxUomId,
    companySupplyPrice: formData.companySupplyPrice,
    wholesalePrice: formData.wholesalePrice,
    includingTaxCompany: formData.includingTaxCompany,
    storePricing: formData.storePricing,
    includingTaxStore: formData.includingTaxStore,
    mrp: formData.mrp,
    tradeInValue: formData.tradeInValue,
    tradeInPercent: formData.tradeInPercent,
    isActive: formData.isActive,
    isInternal: formData.isInternal,
    isOpenPrice: formData.isOpenPrice,
    canOrder: formData.canOrder,
    isProductFrozen: formData.isProductFrozen,
    isStockTracked: formData.isStockTracked,
    warrantyPeriodDays: formData.warrantyPeriodDays,
    returnDaysLimit: formData.returnDaysLimit,
    weightGrams: formData.weightGrams,
    volumeMl: formData.volumeMl,
    validFrom: formData.validFrom,
    validTo: formData.validTo,
    barcodeType: formData.barcodeType,
    posQuickButton: formData.posQuickButton,
    posQuickButtonOrder: formData.posQuickButtonOrder,
    isBundle: formData.isBundle,
    isBundleFlexible: formData.isBundleFlexible,
    category: formData.category,
    businessUnit: formData.businessUnit,
    carType: formData.carType,
    attribute4: formData.attribute4,
    attribute5: formData.attribute5,
    attribute6: formData.attribute6,
    images: formData.images
  };

  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    showSuccessNotification("Product updated successfully");
  } else {
    showErrorNotification("Failed to update product");
  }
}