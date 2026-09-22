/**
 * Handles the submission of the New Retail Customer form.
 * Maps form state to the API schema and manages the lifecycle of the request.
 */
async function createRetailCustomer(formData) {
  // 1. Prepare the payload
  // The 'type' is hardcoded to 'retail' as per business requirements
  const payload = {
    name: formData.name,
    email: formData.email,
    type: "retail",
    addresses: formData.addresses.map(addr => ({
      address_type: addr.address_type,
      address: addr.address,
      phone_1: addr.phone_1,
      phone_2: addr.phone_2,
      fax: addr.fax,
      is_main_address: addr.is_main_address,
      is_shipping_address: addr.is_shipping_address
    }))
  };

  try {
    // 2. Execute API call
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.status === 201) {
      const customer = await response.json();
      // 3. On success, navigate to the new customer's detail page
      navigateTo(`/customers/${customer.id}`);
    } else {
      // 4. On failure, throw error to be caught by the UI layer
      // The UI layer will keep the current form state preserved
      throw new Error("Failed to create customer");
    }
  } catch (error) {
    console.error("Submission error:", error);
    throw error;
  }
}