/**
 * Data Transfer Object mapping the database schema to the 
 * frontend-ready JSON structure defined in TURBOLYMIG-328.
 */
TYPE SalesDeliveryResponse = {
  ref_code: string,
  customer_po_number: string,
  sales_order_id: UUID,
  sales_order_ref_code: string,
  sales_invoice_id: UUID,
  sales_invoice_ref_code: string,
  warehouse_id: UUID,
  warehouse_name: string,
  warehouse_address: string,
  customer_id: UUID,
  customer_name: string,
  customer_address: string,
  notes: string,
  created_by: string,
  updated_by: string,
  created_at: datetime,
  updated_at: datetime,
  delivered_at: datetime,
  journal_id: UUID,
  journal_ref_code: string,
  workflow_state: string,
  lines: Array<{
    sku: string,
    product_name: string,
    product_code: string,
    available_quantity: decimal,
    quantity: decimal,
    unit_price: decimal,
    discount_rate: decimal,
    subtotal: decimal
  }>,
  subtotal: decimal,
  tax: decimal,
  total: decimal
}