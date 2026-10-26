// Node ID: e4cf4115-7e79-4de7-8268-e46ce571055c
// Title: Sub Menu Handler
// Description: Manages the state and visibility of the sub-menu component within the product list page.

Component SubMenuHandler:
  Input: subMenuTrigger (from "Sub Menu" node)
  
  State:
    isSubMenuOpen: boolean (default: false)
    
  Action:
    On "Sub Menu" connection:
      Toggle `isSubMenuOpen` state.
      
  Happy Path:
    User clicks sub-menu trigger; menu expands/collapses based on `isSubMenuOpen`.
    
  Validation/Error:
    Ensure menu closes when clicking outside the component area (blur event).
    
  Empty State:
    Menu is hidden by default.

  Side Effects:
    Updates UI layout to accommodate sub-menu expansion.

Notes covered:
- Management of sub-menu state.
- Toggle logic for visibility.
- Blur event handling for closing.