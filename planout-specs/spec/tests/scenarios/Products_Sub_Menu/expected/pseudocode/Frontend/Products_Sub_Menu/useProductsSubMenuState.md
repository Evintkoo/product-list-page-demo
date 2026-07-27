Custom hook: useProductsSubMenuState

Purpose:
  Encapsulate the local UI state for the Products Sub Menu accordion so it
  can be reused by the ProductsSubMenu component and by the page container
  that decides which page section to render.

State variables:
  - activeKey: string, initial value = "products"   (default active rule)
  - isExpanded: boolean, initial value = true (accordion open by default,
    since the sub menu must show the Products List Page by default)

Exposed functions:
  setActiveKey(key: string):
    - Validate that `key` is one of the known nav item keys
      ("products" | "serviceProducts").
      <!-- ORPHAN_FIELD: key (no backing schema/payload; purely UI state key) -->
    - If valid, update `activeKey` immediately (synchronous state update,
      no debounce, no async wait).
    - If invalid/unknown key is passed, ignore the update and keep current
      `activeKey` (defensive guard — should never happen with static nav model).

  toggleExpanded():
    - Flip `isExpanded` boolean immediately on call.

Return object:
  { activeKey, setActiveKey, isExpanded, toggleExpanded }

Notes:
  - No API calls originate from this hook. There is no corresponding
    Logic-swimlane endpoint for this feature (pure navigation/UI state).
  - No data schema fields are used because this hook does not persist or
    fetch any entity data.