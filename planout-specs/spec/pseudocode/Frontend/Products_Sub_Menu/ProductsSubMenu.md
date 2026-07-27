Component: ProductsSubMenu
Asset: assets/cc78e296-781a-4513-833b-16dccbb06c20.svg

Purpose:
  Render the "Products" accordion sub-menu that lives under the "Products Menu"
  parent navigation item in the header. This is a pure client-side navigation
  component — no API calls, no server data, no form inputs. State is local
  UI state only (which sub-item is active / which page section is displayed).

Imports:
  - useProductsSubMenuState (custom hook, see file below)
  - ProductListPage (page component rendered when "Products" tab active)
  - ServiceProductsListPage (page component rendered when "Service Products" tab active)

Static navigation model (derived from canvas nodes, not from any API):
  navItems = [
    { key: "products", label: "Products", isDefaultActive: true },
    { key: "serviceProducts", label: "Service Products", isDefaultActive: false }
  ]

  Note: These two items are the only sub-menu entries defined by the canvas
  flow ("On click Products" and "On click Service Products"). If additional
  items are added later they must follow the same key/label pattern.

Render behavior:
  1. On mount, call hook `useProductsSubMenuState()` to obtain:
     - activeKey (string) — currently selected nav item key
     - setActiveKey(key) — function to change active item
     - isExpanded (boolean) — whether the accordion body is open
     - toggleExpanded() — function to open/close the accordion

  2. Render the "Products Menu" accordion header (parent trigger).
     - On click of the parent header, call `toggleExpanded()`.
     - Visually reflect expanded/collapsed state (chevron rotation, height animation)
       per the SVG asset structure (accordion container + list rows).

  3. When `isExpanded` is true, render the nav list (accordion body):
     - Iterate over `navItems`.
     - For each item, render a row/button:
         - label = item.label
         - apply "active" visual state if item.key === activeKey
     - Attach onClick handler to each row:
         - "Products" row  → call `handleProductsClick()`
         - "Service Products" row → call `handleServiceProductsClick()`

  4. No form fields exist in this component, therefore no field-level
     validation rules apply. There is nothing to validate on input — the
     only interactive behavior is click-to-select navigation, which must
     update visual state immediately (no submit step, no debounce, no
     confirmation dialog). Active-state change must happen synchronously
     on click, before any page content swap animation.

Event handlers:
  handleProductsClick():
    - setActiveKey("products")
    - Notify parent page container to display Products List Page
      (see ProductsPageContainer.tsx)

  handleServiceProductsClick():
    - setActiveKey("serviceProducts")
    - Notify parent page container to display Service Products List Page

Default state rule (from canvas):
  - On initial render (no prior user interaction), `activeKey` MUST default
    to "products" so that the Products List Page is the default visible
    page section under the Products Menu. This default must be established
    at hook initialization, not after a network call or async effect,
    since there is no backend data dependency for this component.

Accessibility / UX notes:
  - Each nav row should be a real interactive element (button or link role)
    so keyboard users can trigger `onClick` via Enter/Space.
  - Active item must have a distinct visual treatment (e.g. highlighted
    background, bold label) applied immediately on click — no loading
    spinner, no async wait, since this is a pure client-side state change.