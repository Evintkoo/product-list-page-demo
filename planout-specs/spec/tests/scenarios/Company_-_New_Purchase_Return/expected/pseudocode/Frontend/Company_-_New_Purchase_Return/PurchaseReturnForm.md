// Component: PurchaseReturnForm
// Asset: assets/0ba1108c-b032-4590-9dcf-440d7905a89c.svg

State Management:
  - formState: {
      reference_number: string,
      return_type: string, // Required: "Return"
      supplier_id: uuid,
      warehouse_id: uuid,
      invoice_id: uuid,
      purchase_order_id: uuid, // Auto-filled
      notes: string,
      subtotal: decimal,
      discount: decimal,
      tax: decimal,
      total: decimal,
      items: Array<PurchaseReturnItem>
    }

Validation Rules:
  - return_type: Must be selected (Required).
  - invoice_id: Search-required dropdown; trigger search only after >= 3 characters.
  - items: Each item must have a valid qty (must not exceed original invoice quantity).
  - discount: If whole number entered, auto-format to include ",00" suffix.