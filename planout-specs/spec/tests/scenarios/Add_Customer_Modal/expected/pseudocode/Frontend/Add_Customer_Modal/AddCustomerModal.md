Asset: assets/26d1cbfe-0872-43b6-9b94-ac699751e0e0.svg

Component AddCustomerModal:
  State customerData: Object
  State validationErrors: Object
  State isSubmitting: Boolean (default: false)

  // Validation Logic (Triggered on change)
  Function validateField(name, value):
    If name == "Phone Field" AND value is empty:
      Set validationErrors["Phone Field"] = "Phone number is required"
    Else If name == "Name Field" AND value is empty:
      Set validationErrors["Name Field"] = "Customer name is required"
    Else If name == "Store Field" AND value is empty:
      Set validationErrors["Store Field"] = "Store assignment is required"
    Else:
      Clear validationErrors[name]

  // UI Rendering
  Render:
    Modal(title="Add New Customer"):
      // Basic Info
      Input(name="Name Field", required=true, onChange=validateField)
      Input(name="Customer Code Field")
      Input(name="Phone Field", required=true, onChange=validateField)
      Input(name="Email Field")
      Input(name="KTP Field")
      Input(name="NPWP Field")
      Dropdown(name="Occupation Field", options=fetchOccupations())
      DateInput(name="Birthdate Field", format="yyyy-mm-dd")
      Dropdown(name="Gender Field", options=["Male", "Female"])
      Dropdown(name="Store Field", required=true, onChange=validateField)
      Dropdown(name="Group Field", options=fetchGroups())

      // Address Section
      Dropdown(name="Address Type Field")
      Dropdown(name="Country Field", value="Indonesia", disabled=true)
      Dropdown(name="Province Field", onChange=loadRegencies)
      Dropdown(name="Regency/Municipality Field", onChange=loadDistricts)
      Dropdown(name="District Field", onChange=loadVillages)
      Dropdown(name="Village Field", onChange=loadPostalCodes)
      Dropdown(name="Postal Code Field")
      TextArea(name="Address Field")

      // Vehicle Section
      Input(name="Registration No. Field")
      Input(name="Hull Number Field")
      Dropdown(name="Vehicle Type Field", required=true)
      Dropdown(name="Vehicle Make Field", required=true)
      Dropdown(name="Vehicle Model Field", required=true, onChange=updateCategory)
      Input(name="Category Field", readOnly=true) // Derived from Model
      Input(name="Year Field", required=true)
      Input(name="VIN Field")
      DateInput(name="Registration Date Field")
      Input(name="Engine Number Field")
      Input(name="Odometer Field", required=true)
      Input(name="Color Field")
      Input(name="Model Code Field")
      Checkbox(name="Active Field", default=true)
      Input(name="Engine Capacity Field")
      Dropdown(name="Transmission Type Field")
      DateInput(name="Last Service Field")
      DateInput(name="Next Service Field")

      Button(label="Save", onClick=handleSubmit, disabled=isSubmitting OR hasErrors)

  Function handleSubmit:
    Set isSubmitting = true
    // API Call derived from Logic layer
    POST /customers/add (body=customerData)
    On Success: Close Modal, Refresh Sales View
    On Error: Display notification, Set isSubmitting = false

// ===== ORPHAN_FIELD LOG =====
// No orphan fields detected. All fields mapped to schema/payload requirements.