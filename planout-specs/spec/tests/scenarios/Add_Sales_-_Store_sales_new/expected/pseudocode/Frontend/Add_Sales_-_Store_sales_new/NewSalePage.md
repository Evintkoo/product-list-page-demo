// Component: NewSalePage
// Orchestrates the "Add Sales" view.
// Asset: assets/19995779-ce8c-4d57-b38b-2ac8fa4e40fe.svg

state saleForm = {
  customer_id: null,
  salesperson_id: null,
  register_id: null,
  total_amount: 0,
  items: [],
  vehicle_id: null, // <!-- ORPHAN_FIELD: vehicle_id -->
  discount_total: 0, // <!-- ORPHAN_FIELD: discount_total -->
  tax_total: 0, // <!-- ORPHAN_FIELD: tax_total -->
  promo_code: "", // <!-- ORPHAN_FIELD: promo_code -->
  ecommerce_ref_code: "", // <!-- ORPHAN_FIELD: ecommerce_ref_code -->
  notes: "", // <!-- ORPHAN_FIELD: notes -->
  payments: [] // <!-- ORPHAN_FIELD: payments -->
}

onMount:
  call GET /api/users -> populate Salesperson dropdown
  call GET /api/stores -> populate Select Register dropdown
  call GET /api/payment-type -> populate Payment Type dropdown