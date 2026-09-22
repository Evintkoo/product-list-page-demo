/**
 * Handles the initialization of the Wholesale Customer creation page.
 */
async function initializePage() {
  const auth = await fetch("/api/auth/me");
  if (!auth.ok) {
    return redirectTo("/login");
  }

  const response = await fetch("/api/customers/new?wholesale=1");
  const data = await response.json();
  
  // Populate form fields and dropdowns based on data.options and data.defaults
  populateForm(data);
}

/**
 * Submits the wholesale customer form.
 * Collects data from Customer cards and Address table.
 */
async function handleSaveCustomer(formData) {
  const payload = {
    name: formData.name,
    email: formData.email,
    type: "wholesale", // Hardcoded per feature requirement
    tax_id: formData.tax_id,
    addresses: formData.addressList // Array of Address objects
  };

  try {
    const response = await fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const { id } = await response.json();
      redirectTo(`/customers/${id}`);
    } else {
      const errorData = await response.json();
      // Keep user on form, display errorData.errors
      displayErrors(errorData.errors);
    }
  } catch (err) {
    handleNetworkError(err);
  }
}

/**
 * Logic for adding a new address via modal.
 */
function handleAddAddress(newAddress) {
  // Append newAddress to the local state of the Address table
  // This state is persisted when handleSaveCustomer is called
  updateAddressTable(newAddress);
}