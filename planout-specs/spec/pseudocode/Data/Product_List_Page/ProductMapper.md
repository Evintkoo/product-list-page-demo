/**
 * Maps database entities to the API response format required by the frontend.
 */

function mapProductToResponse(product) {
  return {
    id: product.id,
    sku: product.sku,
    productName: product.productName,
    brandName: product.brandName,
    productCode: product.productCode,
    tax: product.tax,
    price: product.price
  };
}