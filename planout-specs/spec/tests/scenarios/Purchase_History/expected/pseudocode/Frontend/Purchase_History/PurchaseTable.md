/**
 * Component: PurchaseTable
 * Displays PURCHASE entity fields: id, product_id, supplier_name, purchase_date, quantity, unit_price
 */

// Node: Purchase Delivery (id: 732b0dba-588f-4616-931c-f085b24bebd7)
// Node: PD/WH01/22020001 (id: 0b3cbfeb-dbfc-498f-b85b-33be9fea4890)
// Node: PD/WH01/21110002 (id: b45b4cff-b664-4cee-b20b-4c0f96f4e673)
// Logic: Render document number as a link to details page.
// Note: The document number is an ORPHAN_FIELD: document_number <!-- ORPHAN_FIELD: document_number -->

// Node: Supplier column header (id: 91e22061-f089-47da-aee9-50251e9c8442)
// Logic: Display supplier_name with sort arrow.

// Node: Date (id: 65bd7b99-65f0-4fa4-a53f-1ea4714b3d5e)
// Logic: Display purchase_date. Clickable header for sorting.

// Node: Quantity (id: 01f4365f-f887-498f-87e8-cfd18c1ff373)
// Logic: Display quantity.

// Node: Price (id: 38b7f640-8af7-43aa-b560-24de4ced9d24)
// Logic: Display unit_price.

/**
 * Notes covered:
 * - QR Codes: button used to display or print this product's QR code.
 * - PD/WH01/22020001: first purchase shipment document number appears as a link.
 * - Supplier column header: Displays supplier_name, arrow icon for organization.
 * - PD/WH01/21110002: document number as blue link to details.
 * - Barcode: button to display or print product barcode.
 * - Supplier filter dropdown: inverted hat icon ^, opens list of supplier options.
 * - on page load: reads product id, calls GET /products/:id/purchases, renders table.
 * - Search: performs search using supplier filter, reloads table.
 * - Price: displays unit_price.
 * - Quantity: displays quantity.
 * - Date: header for purchase_date, clickable with sort arrow.
 * - Purchase Delivery: column for document number.
 */