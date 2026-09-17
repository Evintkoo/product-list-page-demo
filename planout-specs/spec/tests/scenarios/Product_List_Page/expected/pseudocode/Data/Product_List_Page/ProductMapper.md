/**
 * Maps database entities to the API response format required by the frontend.
 */

FUNCTION mapProductToResponse(productEntity):
    RETURN {
        "sku": productEntity.sku,
        "productName": productEntity.productName,
        "brandName": productEntity.brandName,
        "productCode": productEntity.productCode,
        "tax": productEntity.tax,
        "price": productEntity.price
    }