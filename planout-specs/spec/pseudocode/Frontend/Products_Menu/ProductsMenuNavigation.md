Component: ProductsMenuNavigation
Purpose: Renders the top-level header navigation list (Products and sibling items). Purely client-side UI state — no API calls, no persisted entities involved (this feature has no backend data contract).

Asset: assets/16fbbd8a-2141-4a70-a6bc-1c62a3c55ee3.svg
(Reference the structure.txt tree for exact item order, icon placement, and chevron position when generating markup/styles.)

State & data source:
  - Navigation items are defined as a static configuration list local to this component (not fetched from an API, since no endpoint or entity exists for menu items in the authoritative schemas).
  - Each navigation item config shape:
      - id (string) — unique key for the item
      - label (string) — display text
      - defaultRoute (string) — page/route shown when item is selected and it has no sub menu, or the sub menu's default page when it does
      - hasSubMenu (boolean) — whether this item owns a collapsible Product Sub Menu component
      - subMenuRef (string, optional) — identifier of the sub menu component to render/toggle when hasSubMenu is true
  - Example seed config (illustrative only, not an entity):
      - { id: "products", label: "Products", hasSubMenu: true, subMenuRef: "product-sub-menu", defaultRoute: <default page of Product Sub Menu> }
      - other sibling items follow the same shape as configured by the design (no sub menu unless flagged)

Consumed hook:
  - Use custom hook `useNavigationMenu(navigationItems)` (see useNavigationMenu.ts) to obtain:
      - activeItemId
      - expandedMenuId
      - handleItemClick(itemId)
      - isItemActive(itemId)
      - isMenuExpanded(itemId)

Initial render behavior:
  - On mount, hook initializes activeItemId to the "products" item id (default active state) and expandedMenuId to "products" as well, because Products has a sub menu and its default page must be visible immediately without requiring a click.
  - No loading/error state needed — nothing is fetched remotely.

Render logic (for each navigation item in navigationItems, in order):
  1. Render the item's label and icon (if any) per the structural tree from the SVG asset.
  2. Determine active styling:
       - If isItemActive(item.id) is true, apply the active visual state (highlight, underline, or background per asset) to this item.
  3. Determine chevron visibility:
       - If item.hasSubMenu is true, render a chevron icon beside the item's label.
       - Chevron rotates/flips based on isMenuExpanded(item.id) (pointing down when collapsed, up when expanded) — purely presentational state, updates instantly on toggle, no debounce.
       - If item.hasSubMenu is false, do not render a chevron.
  4. Attach click handler:
       - onClick → call handleItemClick(item.id) immediately on click (no confirmation step, no async wait).
  5. If item.hasSubMenu is true and isMenuExpanded(item.id) is true:
       - Render the referenced Product Sub Menu component (subMenuRef) directly beneath this item, in accordion fashion (expand/collapse transition, only one sub menu open at a time per handleItemClick behavior defined in the hook).
       - Pass the item's defaultRoute down to the Product Sub Menu component so it knows which of its own child pages to show as default when first opened.

Interaction rules (validation-equivalent constraints, since this is a navigation control, not a form):
  - Clicking the currently active item that has no sub menu does nothing extra beyond re-confirming active state (idempotent).
  - Clicking an item with hasSubMenu:
      - Toggles that item's sub menu open/closed immediately on click — no delay, no loading spinner, since this is local UI state, not a network call.
      - Also sets that item as the active item immediately, and updates the visible main content area to that item's defaultRoute (or, if the sub menu is being expanded for the first time, to the sub menu's own default child page).
      - Only one sub menu may be expanded at any time; expanding a new one collapses any previously expanded sub menu instantly.
  - Clicking an item without hasSubMenu:
      - Immediately sets it as active, immediately navigates to its defaultRoute, and immediately collapses any currently expanded sub menu (since focus moved away from Products).
  - All active/expanded state changes must be reflected in the UI synchronously on click — never deferred to a submit or confirmation action (there is no submit step in this component).