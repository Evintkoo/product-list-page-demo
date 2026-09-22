/**
 * Component: UserDetailsModal
 * Asset: assets/2e5cc957-6e6b-431b-8190-c5c2cc65232b.svg
 * 
 * This modal provides a form to view and edit customer details.
 * Validation is performed on-the-fly for all required fields.
 */

component UserDetailsModal {
  state formData = {
    name: "",
    phone: "",
    store_id: null,
    salesperson_id: null,
    birthdate: null,
    gender: "",
    email: "",
    occupation_id: null,
    identity_number: "",
    area_region: "", // ORPHAN_FIELD: area_region
    notes: "",
    customer_code: "",
    customer_wholesale_id: null
  }

  state errors = {}

  // Validation Logic
  function validateField(name, value) {
    let error = null;
    if (["name", "phone", "store_id"].includes(name) && !value) {
      error = "This field is required.";
    }
    if (name === "birthdate" && value && !isPlausibleDate(value)) {
      error = "Please enter a valid, plausible date.";
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  }

  // UI Render
  render() {
    return (
      <Modal title="User Details">
        <Input label="Name" value={formData.name} required onChange={(v) => update("name", v)} />
        <Input label="Phone" value={formData.phone} required onChange={(v) => update("phone", v)} />
        <Dropdown label="Store" value={formData.store_id} required onChange={(v) => update("store_id", v)} />
        <Dropdown label="Salesperson" value={formData.salesperson_id} onChange={(v) => update("salesperson_id", v)} />
        <DatePicker label="Birthdate" value={formData.birthdate} onChange={(v) => update("birthdate", v)} />
        <Dropdown label="Gender" value={formData.gender} onChange={(v) => update("gender", v)} />
        <Input label="Email" value={formData.email} onChange={(v) => update("email", v)} />
        <Dropdown label="Occupation" value={formData.occupation_id} onChange={(v) => update("occupation_id", v)} />
        <Input label="KTP" value={formData.identity_number} onChange={(v) => update("identity_number", v)} />
        <Input label="Area/Region" value={formData.area_region} onChange={(v) => update("area_region", v)} />
        <Textarea label="Notes" value={formData.notes} onChange={(v) => update("notes", v)} />
        <Input label="Customer Code" value={formData.customer_code} onChange={(v) => update("customer_code", v)} />
        <Dropdown label="Company" value={formData.customer_wholesale_id} onChange={(v) => update("customer_wholesale_id", v)} />
        
        <Button 
          disabled={!isFormValid()} 
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </Modal>
    )
  }

  function update(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  }
}