/**
 * Controller to manage the state of the FPO (Standard) Discount modal.
 */

class ProductDiscountController {
  // State variables for the UI
  private productState = {
    SKU: "",
    name: "",
    price: 0
  };

  /**
   * Handles the initial load of the modal by mapping the caller component's data.
   */
  public onLoad(data: { sku: string, name: string, price: number }) {
    this.productState = {
      SKU: data.sku,
      name: data.name,
      price: data.price
    };
    
    return this.productState;
  }
}