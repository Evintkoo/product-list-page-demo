/**
 * UI Component for the Order Warehouse Product Form Card.
 * Displays product info and allows users to input order quantities.
 */
COMPONENT WarehouseOrderForm(productId: UUID)
  IMPORT { orderQuantity, setOrderQuantity, submitOrder, isSubmitting } FROM useWarehouseOrder(productId)

  RENDER
    CARD
      HEADER "Order Warehouse Product"
      
      INPUT(type="number", value=orderQuantity, onChange=(val) => setOrderQuantity(val))
      
      BUTTON(onClick=submitOrder, disabled=isSubmitting || orderQuantity <= 0)
        IF isSubmitting THEN "Processing..." ELSE "Place Order"
      
      IF error THEN DISPLAY error_message