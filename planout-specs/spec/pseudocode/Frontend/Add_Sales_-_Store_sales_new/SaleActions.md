// Component: Save/Cancel Controls

function handleSave():
  // Validation:
  if (!saleForm.customer_id || !saleForm.salesperson_id || !saleForm.register_id):
    showError("Customer, Salesperson, and Register are required.")
    return

  // Payload construction:
  payload = {
    customer_id: saleForm.customer_id,
    salesperson_id: saleForm.salesperson_id,
    register_id: saleForm.register_id,
    total_amount: saleForm.total_amount,
    items: saleForm.items,
    vehicle_id: saleForm.vehicle_id,
    discount_total: saleForm.discount_total,
    tax_total: saleForm.tax_total,
    promo_code: saleForm.promo_code,
    ecommerce_ref_code: saleForm.ecommerce_ref_code,
    notes: saleForm.notes,
    payments: saleForm.payments
  }

  call POST /api/sale with payload
  onSuccess: redirect to sales list
  onFailure: display error message