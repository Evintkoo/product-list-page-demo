/**
 * Component: SupplierDetailsCard
 * Asset: assets/ea558ba1-dfc9-4178-a4a9-7b88bb3efb5c.svg
 * 
 * This component manages the form state for Supplier details.
 * Validation is triggered onBlur or onChange for immediate feedback.
 */

COMPONENT SupplierDetailsCard:
  STATE formState = {
    Name: "",
    supplier_code: "", // ORPHAN_FIELD: supplier_code
    contact_name: "",  // ORPHAN_FIELD: contact_name
    phone_number: "",  // ORPHAN_FIELD: phone_number
    mobile_number: "", // ORPHAN_FIELD: mobile_number
    email_address: "", // ORPHAN_FIELD: email_address
    fax_number: "",    // ORPHAN_FIELD: fax_number
    address: "",       // ORPHAN_FIELD: address
    country: "Indonesia",
    tax_number: "",    // ORPHAN_FIELD: tax_number
    registration_number: "" // ORPHAN_FIELD: registration_number
  }

  STATE errors = {}

  // Validation Logic
  FUNCTION validateField(name, value):
    IF name IN ["Name", "contact_name", "phone_number", "address"] AND value IS EMPTY:
      SET errors[name] = "This field is required"
    ELSE IF name == "email_address" AND value IS NOT EMPTY AND !isValidEmail(value):
      SET errors[name] = "Invalid email format"
    ELSE:
      REMOVE errors[name]

  // Render Fields
  RENDER:
    // Required Fields
    INPUT(Name, label="Name", required=TRUE, onChange=(v) => update(Name, v))
    INPUT(contact_name, label="Contact Name", required=TRUE, onChange=(v) => update(contact_name, v))
    INPUT(phone_number, label="Phone Number", required=TRUE, onChange=(v) => update(phone_number, v))
    INPUT(address, label="Address", required=TRUE, onChange=(v) => update(address, v))
    DROPDOWN(country, label="Country", options=["Indonesia", ...], default="Indonesia", onChange=(v) => update(country, v))

    // Optional Fields
    INPUT(supplier_code, label="Supplier Code", onChange=(v) => update(supplier_code, v))
    INPUT(mobile_number, label="Mobile Number", onChange=(v) => update(mobile_number, v))
    INPUT(email_address, label="Email Address", onChange=(v) => update(email_address, v))
    INPUT(fax_number, label="Fax Number", onChange=(v) => update(fax_number, v))
    INPUT(tax_number, label="Tax Number", onChange=(v) => update(tax_number, v))
    INPUT(registration_number, label="Registration No.", onChange=(v) => update(registration_number, v))

    BUTTON(label="Save", onClick=handleSubmit, disabled=errors IS NOT EMPTY)

  FUNCTION handleSubmit():
    // Logic to trigger API call based on context
    // Note: API CONTRACTS is empty, awaiting integration logic for POST /suppliers
    CALL API_ENDPOINT_POST_SUPPLIER(formState)