// Node ID: 948a82b9-65bf-4b48-9e79-363bfee5792b
// Title: Product Details Navigation
// Description: Handles the transition from the product list row selection to the specific product details view.

Component ProductDetailsNavigation:
  Input: productRowSelection (from "Row Selector" node)
  
  Action:
    On "product details page" connection:
      Navigate to `/products/{id}` using the `id` field from the selected Product entity.
      
  Happy Path:
    User clicks a row; application routes to the detail view passing the `id` as a URL parameter.
    
  Validation/Error:
    If `id` is null or undefined, prevent navigation and log error: "Invalid product selection".
    
  Empty State:
    N/A (Triggered by user interaction).

  Side Effects:
    Updates browser history stack.

Notes covered:
- Transition from row selection to product details view.
- Use of `id` field for routing.
- Validation of `id` presence.