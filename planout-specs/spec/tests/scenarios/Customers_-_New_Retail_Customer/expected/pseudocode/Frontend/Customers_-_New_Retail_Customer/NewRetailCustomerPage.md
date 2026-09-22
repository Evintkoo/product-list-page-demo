// Component: NewRetailCustomerPage
// Asset: assets/757b7945-aff6-4d5e-95dc-da016b9a3dd7.svg

state customerForm = {
  name: "",
  email: "",
  type: "retail",
  addresses: [] // Array of Address objects
}

onMount:
  call GET /api/auth/me
  if response == failed:
    redirect to "/login"
  
  call GET /api/customers/new?retail=1
  // Populate dropdowns and default values from response

function handleSave():
  // Validate form fields (name, email, etc.)
  // Ensure at least one address is marked as is_main_address
  
  payload = {
    name: customerForm.name,
    email: customerForm.email,
    type: "retail",
    addresses: customerForm.addresses
  }
  
  call POST /api/customers with payload
  on 201:
    navigate to "/customers/" + response.id