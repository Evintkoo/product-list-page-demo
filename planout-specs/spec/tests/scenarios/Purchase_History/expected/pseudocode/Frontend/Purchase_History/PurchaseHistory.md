// Node: QR Codes (02fc4ff6-f04f-4ec6-87e5-6c5a1af3b6af)
// Asset: assets/5f296374-83c4-4b33-804f-f15d049e3c4e.svg
// Description: Button to display/print product QR code for scanning.
// Happy Path: On click, triggers modal/print dialog for QR code.
// Notes covered: button used to display or print this product's QR code, typically for quick scanning purposes such as checking the product via a camera or scanning device.

// Node: (9a9806a3-f2c0-44f4-94b1-cbf31b2e2ce8)
// Description: Modal/Print interface for QR code.
// Happy Path: Renders QR code image.
// Notes covered: display or print this product's QR code,

// Node: PD/WH01/22020001 (0b3cbfeb-dbfc-498f-b85b-33be9fea4890)
// Description: Link to document details.
// Happy Path: Clicking redirects to document details page.
// Notes covered: The first purchase shipment document number appears as a link clicking it redirects the user to the document's details page to view the full information. <!-- ORPHAN_FIELD: document_number -->

// Node: Supplier column header (91e22061-f089-47da-aee9-50251e9c8442)
// Description: Displays supplier name with sort/filter icon.
// Happy Path: Displays "supplier_name" from PURCHASE entity.
// Notes covered: Displays the supplier name on each purchase line. An arrow icon appears next to it, helping users identify and organize the source of each transaction within the table.

// Node: PD/WH01/21110002 (b45b4cff-b664-4cee-b20b-4c0f96f4e673)
// Description: Document link for second row.
// Happy Path: Clicking redirects to specific shipment transaction details.
// Notes covered: document number, which also appears as a blue link. Clicking it is supposed to open the details for the relevant shipment transaction, but it leads to a different document than the one in the first row. <!-- ORPHAN_FIELD: document_number -->

// Node: Barcode (3b666040-29ed-4e69-977f-f7323179225d)
// Description: Button to display/print barcode.
// Happy Path: On click, triggers modal/print dialog for barcode.
// Notes covered: Barcode button clicking it allows the user to display or print the product barcode.

// Node: Supplier filter dropdown (0c2e54df-c830-4a5a-ba50-88c4f7912896)
// Description: Filter menu for suppliers.
// Happy Path: Clicking ^ icon opens list of supplier options.
// Notes covered: An inverted hat icon the ^ symbol is located at the far right clicking it opens a list of supplier options, displaying a menu from which the user can make a selection.

// Node: on page load (bfceb507-4c02-4234-b787-7e1ee0ad95e7)
// Description: Initialization logic.
// Happy Path: Calls GET /products/:id/purchases with no filters and default date sort.
// Validation: If 404, display error message.
// Side Effects: Populates table with PURCHASE entity fields: id, product_id, supplier_name, purchase_date, quantity, unit_price.
// Notes covered: When the Purchase History page is first loaded, the system automatically reads the current product id and calls the purchase history endpoint (GET /api/products/:id/purchases) with default parameters — no supplier filter and default sorting by purchase date. The returned purchase records are then rendered into the table below.