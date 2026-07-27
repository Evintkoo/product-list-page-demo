Hook: useNavigationMenu(navigationItems)
Purpose: Encapsulate the accordion + active-item state logic shared by the Products Menu Navigation list, reusable and testable independent of markup.

Internal state:
  - activeItemId — currently selected navigation item id. Initialized to the id of the item flagged as the default active item in navigationItems config (the "Products" item, per the feature's default-state rule). If no item is explicitly flagged default, fall back to the first item in the list.
  - expandedMenuId — id of the currently expanded sub menu (or null if none expanded). Initialized to the default active item's id if that item hasSubMenu is true (so Products' sub menu is open by default, showing its default page immediately on first load), otherwise null.

Derived/exposed values:
  - isItemActive(itemId): returns true if itemId === activeItemId.
  - isMenuExpanded(itemId): returns true if itemId === expandedMenuId.

Exposed handler:
  - handleItemClick(itemId):
      1. Look up the clicked item's config from navigationItems by itemId.
      2. Set activeItemId = itemId immediately (synchronous state update, no async/await, no network round-trip).
      3. If the clicked item.hasSubMenu is true:
           - If expandedMenuId === itemId (already expanded), collapse it: set expandedMenuId = null.
           - Else, expand it: set expandedMenuId = itemId (this automatically collapses whichever other sub menu was previously expanded, since expandedMenuId only holds a single value at a time).
      4. If the clicked item.hasSubMenu is false:
           - Set expandedMenuId = null (collapse any open sub menu, since the newly active item has none).
      5. Emit/notify the parent content area of the route to display:
           - If item.hasSubMenu is true and now expanded, use the sub menu's default child page.
           - Otherwise use item.defaultRoute.
         (This notification can be a callback prop, context update, or router navigation call, depending on how the app wires page rendering — no API call is involved.)

Notes on consistency:
  - This hook manages purely local UI/navigation state; there is no corresponding Logic-swimlane endpoint for this feature (no entities, no API payloads defined for menu items), so no request/response shape needs to be kept in sync between Frontend and Logic for this specific node.
  - If a future Logic swimlane node introduces a real "menu configuration" endpoint, replace the static `navigationItems` seed list with a fetch call using the exact method/path/response body fields defined at that time, and update this hook to hydrate initial state (activeItemId/expandedMenuId defaults) from that response instead of a hardcoded default flag.