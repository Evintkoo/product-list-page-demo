/**
 * Modal for editing individual customer addresses.
 * Asset: assets/2d689598-7cb3-4a4a-9a77-882d5c28159e.svg
 */
component EditAddressModal {
  state addressForm = { ...initialData }

  // Validation Logic
  validatePhone(value) {
    // Regex: Ensure only digits, +, and - are allowed
    return /^[0-9+\-\s]+$/.test(value)
  }

  render() {
    <Modal title="Address">
      <Dropdown name="Address Type" />
      <Dropdown name="Country" />
      <Dropdown name="Province" />
      <Dropdown name="Regency/Municipality" />
      <Dropdown name="District" />
      <Dropdown name="Village" />
      <Dropdown name="Postal Code" />
      <TextArea name="Address" />
      
      <TextField 
        name="Phone 1" 
        onChange={(v) => validatePhone(v) ? update(v) : showError("Invalid format")} 
      />
      <TextField 
        name="Phone 2" 
        onChange={(v) => validatePhone(v) ? update(v) : showError("Invalid format")} 
      />
      <TextField name="Fax" />
      <TextField name="Latitude" />
      <TextField name="Longitude" />
      
      <Button name="Cancel" onClick={closeModal} />
      <Button name="Save" onClick={submitForm} />
    </Modal>
  }
}

// ORPHAN_FIELD: customer_code
// ORPHAN_FIELD: name
// ORPHAN_FIELD: phone
// ORPHAN_FIELD: area_region
// ORPHAN_FIELD: ktp
// ORPHAN_FIELD: email
// ORPHAN_FIELD: detail_bank
// ORPHAN_FIELD: contact_full_name
// ORPHAN_FIELD: contact_phone
// ORPHAN_FIELD: contact_region
// ORPHAN_FIELD: contact_country
// ORPHAN_FIELD: contact_email
// ORPHAN_FIELD: contact_position
// ORPHAN_FIELD: contact_departement
// ORPHAN_FIELD: notes
// ORPHAN_FIELD: npwp
// ORPHAN_FIELD: nppkp
// ORPHAN_FIELD: nitku