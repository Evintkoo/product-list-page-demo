/**
 * Handles creation of new service types.
 * Fields: name, description, service account, refund account
 */
Component NewTypeModal:
  // ORPHAN_FIELD: name
  // ORPHAN_FIELD: description
  // ORPHAN_FIELD: service_account
  // ORPHAN_FIELD: refund_account
  
  Render:
    Form:
      Input(name="name")
      TextArea(name="description")
      Input(name="service_account")
      Input(name="refund_account")
      Button("Save") // Triggers POST /product-types (Logic node implied)