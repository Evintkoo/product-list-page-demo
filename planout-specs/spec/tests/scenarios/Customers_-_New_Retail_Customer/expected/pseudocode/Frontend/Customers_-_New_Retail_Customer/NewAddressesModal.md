// Component: NewAddressesModal
// Form fields must match API PAYLOADS request.body.addresses

state addressForm = {
  address_type: "",
  address: "",
  phone_1: "",
  phone_2: "",
  fax: "",
  is_main_address: false,
  is_shipping_address: false
}

// Validation:
// - address_type: required
// - address: required
// - phone_1: required

render:
  Input(name="address_type", value=addressForm.address_type)
  Input(name="address", value=addressForm.address)
  Input(name="phone_1", value=addressForm.phone_1)
  Input(name="phone_2", value=addressForm.phone_2)
  Input(name="fax", value=addressForm.fax)
  Checkbox(name="is_main_address", checked=addressForm.is_main_address)
  Checkbox(name="is_shipping_address", checked=addressForm.is_shipping_address)
  
  Button "Save" onClick: onSave(addressForm)