// Node ID: d5b6c86c-ec16-448a-80f2-73be4e0f532f
// Title: Common Menu Integration
// Description: Integrates the global application menu into the product list page layout.

Component CommonMenuIntegration:
  Input: menuData (from "Main menu" node)
  
  Action:
    On "Common Component" connection:
      Render global navigation items provided by the main menu service.
      
  Happy Path:
    Menu renders with standard links (e.g., Dashboard, Products, Settings).
    
  Validation/Error:
    If menu data fails to load, display a fallback "Menu Unavailable" state.
    
  Empty State:
    Display loading skeleton while fetching menu configuration.

  Side Effects:
    Provides global context for navigation across the ERP.

Notes covered:
- Integration of global menu.
- Fallback state for menu load failure.
- Loading state handling.