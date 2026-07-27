Component: ProductsPageContainer

Purpose:
  Decide which page section to render based on the currently active
  sub-menu item. This corresponds to the canvas nodes representing
  "Products List Page" (default) and "Service Products List Page".

Imports:
  - useProductsSubMenuState (shared instance/context — same source of truth
    used by ProductsSubMenu so both stay in sync)
  - ProductListPage
  - ServiceProductsListPage

Render behavior:
  1. Read `activeKey` from the shared `useProductsSubMenuState()` state
     (should be provided via a shared context/provider wrapping both
     ProductsSubMenu and ProductsPageContainer so navigation clicks and
     page rendering stay synchronized without prop-drilling mismatches).

  2. Conditional render:
     - if activeKey === "products" → render <ProductListPage />
       (this is the default page shown on first load, per canvas rule:
       "Set 'Products' item as default active state so show the
       Product List Page as default page.")
     - if activeKey === "serviceProducts" → render <ServiceProductsListPage />
     - else → render nothing / fallback empty state (should not occur given
       the guarded setActiveKey validation above)

  3. Page switch must happen immediately when `activeKey` changes — no
     loading spinner or async fetch gate at this layer, since page
     selection itself is pure client-side routing. Each individual page
     component (ProductListPage / ServiceProductsListPage) is responsible
     for its own data loading and validation, which is out of scope for
     this navigation feature.

Integration notes for code generation:
  - Wrap the header's Products Menu section with a single state provider
    (Context) instantiated once, so `ProductsSubMenu` (nav clicks) and
    `ProductsPageContainer` (page rendering) consume the same `activeKey`
    /`setActiveKey` pair — preventing desynchronization between menu
    highlight and displayed page.
  - No API endpoints, request payloads, or entity schemas apply to this
    feature; it is a pure frontend navigation/accordion component as
    defined by the canvas flow.