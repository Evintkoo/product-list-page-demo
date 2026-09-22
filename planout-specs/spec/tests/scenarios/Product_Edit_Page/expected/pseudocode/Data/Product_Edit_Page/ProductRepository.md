/**
 * Data access layer for Product entity.
 * Handles persistence logic for the Product Edit Page.
 */

FUNCTION getProductById(id: UUID):
    RETURN SELECT * FROM Product WHERE id = id;

FUNCTION updateProduct(id: UUID, data: ProductUpdatePayload):
    // Perform atomic update on the Product table
    UPDATE Product
    SET 
        SKU = data.SKU,
        productName = data.productName,
        productDescription = data.productDescription,
        type = data.type,
        brand = data.brand,
        tag = data.tag,
        supplierProductCode = data.supplierProductCode,
        supplierId = data.supplierId,
        tax = data.tax,
        taxProductCodeId = data.taxProductCodeId,
        taxUomId = data.taxUomId,
        companySupplyPrice = data.companySupplyPrice,
        wholesalePrice = data.wholesalePrice,
        includingTaxCompany = data.includingTaxCompany,
        storePricing = data.storePricing,
        includingTaxStore = data.includingTaxStore,
        mrp = data.mrp,
        tradeInValue = data.tradeInValue,
        tradeInPercent = data.tradeInPercent,
        isActive = data.isActive,
        isInternal = data.isInternal,
        isOpenPrice = data.isOpenPrice,
        canOrder = data.canOrder,
        isProductFrozen = data.isProductFrozen,
        isStockTracked = data.isStockTracked,
        warrantyPeriodDays = data.warrantyPeriodDays,
        returnDaysLimit = data.returnDaysLimit,
        weightGrams = data.weightGrams,
        volumeMl = data.volumeMl,
        validFrom = data.validFrom,
        validTo = data.validTo,
        barcodeType = data.barcodeType,
        posQuickButton = data.posQuickButton,
        posQuickButtonOrder = data.posQuickButtonOrder,
        isBundle = data.isBundle,
        isBundleFlexible = data.isBundleFlexible,
        category = data.category,
        businessUnit = data.businessUnit,
        carType = data.carType,
        attribute4 = data.attribute4,
        attribute5 = data.attribute5,
        attribute6 = data.attribute6,
        images = data.images
    WHERE id = id;

    RETURN SUCCESS;