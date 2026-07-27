Component: ProductFilterBar

Purpose:
  Filter bar above the product table. Provides free-text and dropdown filters,
  plus the "Apply Search" action that triggers the product query.

Local (uncommitted) State — mirrors filter fields, validated as the user types,
before the user presses Apply Search:
  - skuText: string
  - nameText: string
  - productCodeText: string
  - brandNameSelection: string (dropdown)
  - productTypeSelection: string (dropdown) <!-- ORPHAN_FIELD: productType -->
  - taxSelection: string (dropdown) <!-- ORPHAN_FIELD: taxFilter -->
  - tagsSelection: array of string (multi-select) <!-- ORPHAN_FIELD: tags -->
  - categoryText: string

Note on orphan fields:
  productType, taxFilter (tax as a filter criterion), and tags have no
  corresponding entry in GET /api/products query parameters or in the
  Product schema as filterable criteria. They are rendered per the visual
  design but MUST NOT be sent to the API until the contract is extended.
  Flagged above with ORPHAN_FIELD markers for reviewer follow-up.

Field-level validation (fires immediately on every keystroke / selection change,
never deferred to submit):

  skuText:
    - Trim leading/trailing whitespace before validating.
    - Allowed characters: letters, digits, hyphen, underscore.
    - Max length: 50 characters.
    - If invalid character or length exceeded -> show inline error
      "SKU can only contain letters, numbers, - or _, up to 50 characters."
      and disable Apply Search button until corrected.

  nameText:
    - Max length: 150 characters.
    - No validation on character set (free text name search).
    - If exceeded -> show inline error "Name search is too long (max 150 characters)."
      and disable Apply Search button until corrected.

  productCodeText:
    - Trim leading/trailing whitespace before validating.
    - Allowed characters: letters, digits, hyphen.
    - Max length: 50 characters.
    - If invalid -> show inline error "Product Code can only contain letters,
      numbers, or -, up to 50 characters." and disable Apply Search button.

  brandNameSelection:
    - Must be one of the known brand options (populated from a static/lookup
      list; no listing endpoint is defined in this contract) or the "All Brands"
      default. No further validation.

  categoryText:
    - Trim leading/trailing whitespace.
    - Max length: 100 characters.
    - If exceeded -> show inline error "Category is too long (max 100 characters)."
      and disable Apply Search button.

  productTypeSelection, taxSelection, tagsSelection:
    - Rendered and interactable for UX parity with the design, but excluded
      from the outgoing request payload (see orphan note above). No
      network-relevant validation is applied to these controls.

Composed "search" term:
  - Since GET /api/products exposes a single `search` query parameter that
    matches against Product.productName, Product.SKU, Product.brandName,
    and Product.productCode, the three text inputs (skuText, nameText,
    productCodeText) are combined into one `search` value when the user
    presses Apply Search:
      - If more than one of the three fields is non-empty, join their
        trimmed values with a single space.
      - If all three are empty, `search` is omitted from the request.

Button: "Apply Search" (blue, checkmark icon)
  - Disabled whenever any field above is in an invalid state.
  - On click:
      1. Re-run full validation pass on all fields; abort with no request if
         any field is invalid (should already be prevented by disabled state).
      2. Build the committed filters object:
           search: composed search term (see above, omitted if empty)
           category: categoryText (trimmed, omitted if empty)
           status: not present in filter bar per design — omitted
           brandName: brandNameSelection (omitted if "All Brands"/empty)
      3. Call parent callback `applyFilters(committedFilters)`, which resets
         page to 1 and triggers GET /api/products via useProductList.

Render:
  - Text input: SKU (bound to skuText, inline validation message).
  - Text input: Name (bound to nameText, inline validation message).
  - Text input: Product Code (bound to productCodeText, inline validation message).
  - Dropdown: Brand (bound to brandNameSelection).
  - Dropdown: Product Type (bound to productTypeSelection) <!-- ORPHAN_FIELD: productType -->
  - Dropdown: Tax (bound to taxSelection) <!-- ORPHAN_FIELD: taxFilter -->
  - Multi-select: Tags (bound to tagsSelection) <!-- ORPHAN_FIELD: tags -->
  - Text input: Item Category (bound to categoryText, inline validation message).
  - "Apply Search" button as described above.