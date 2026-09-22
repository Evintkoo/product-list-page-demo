// Component: AddressesCard
// Manages the list of addresses for the customer

state isModalOpen = false

render:
  Table:
    Headers: ["No.", "Address Type", "Phone 1", "Phone 2", "Fax", "Main Address", "Shipping Address"]
    Rows: customerForm.addresses.map((addr, index) => (
      [index + 1, addr.address_type, addr.phone_1, addr.phone_2, addr.fax, addr.is_main_address, addr.is_shipping_address]
    ))
  
  Button "Add Address" onClick: set isModalOpen(true)

  if isModalOpen:
    <NewAddressesModal 
      onClose: set isModalOpen(false)
      onSave: (newAddr) => {
        customerForm.addresses.push(newAddr)
        set isModalOpen(false)
      }
    />