/**
 * Logic hook to handle the initialization of the "Add Discount" modal.
 * This component retrieves the product context passed from the parent inventory row.
 */

export const useProductDiscountLogic = (productContext: { sku: string, name: string, price: number }) => {
  
  /**
   * OnLoad: Maps the incoming product data to the local state required for the UI.
   * This ensures the modal displays the correct product details before user interaction.
   */
  const initializeModal = () => {
    const productData = {
      SKU: productContext.sku,
      name: productContext.name,
      price: productContext.price
    };

    return productData;
  };

  return {
    initializeModal
  };
};