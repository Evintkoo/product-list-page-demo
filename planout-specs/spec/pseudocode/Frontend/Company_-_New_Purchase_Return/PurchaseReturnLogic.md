// Logic for calculations and API interaction

Function calculateTotals():
  - subtotal = sum(item.qty * item.price for item in items)
  - tax = subtotal * (tax_percentage_from_purchase_order)
  - total = subtotal - discount + tax
  - Update formState with new values.

Function handleSave():
  - Validate all required fields.
  - POST /purchase-returns with payload:
      {
        "reference_number": formState.reference_number,
        "return_type": formState.return_type,
        "supplier_id": formState.supplier_id,
        "warehouse_id": formState.warehouse_id,
        "invoice_id": formState.invoice_id,
        "purchase_order_id": formState.purchase_order_id,
        "notes": formState.notes,
        "subtotal": formState.subtotal,
        "discount": formState.discount,
        "tax": formState.tax,
        "total": formState.total,
        "items": formState.items
      }
  - On 201 Success: Navigate to "Company Purchase Return List" page.