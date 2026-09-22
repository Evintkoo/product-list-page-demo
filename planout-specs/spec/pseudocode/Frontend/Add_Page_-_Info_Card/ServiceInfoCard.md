/**
 * Component: ServiceInfoCard
 * Asset: assets/3592f735-3baa-42d9-bded-241015d54f29.svg
 * 
 * Manages the primary details of a service product.
 * Validation is performed on-change for all required fields.
 */

Component ServiceInfoCard:
  State:
    formData = { name: "", sku: "", description: "", type: null, tags: [] }
    errors = { name: "", sku: "" }
    isNewTypeModalOpen = false
    isNewTagModalOpen = false

  // Validation Logic (Immediate feedback)
  Function validateField(field, value):
    If field == "name":
      errors.name = (value.length == 0) ? "Name is required" : ""
    If field == "sku":
      errors.sku = (value.length == 0) ? "SKU is required" : ""

  // Render
  Render:
    Container (Info Card):
      // Name Field
      Input(label="Name", required=true, value=formData.name, error=errors.name)
        OnBlur: validateField("name", formData.name)
        OnChange: formData.name = event.target.value

      // SKU Field
      Input(label="SKU", required=true, helpIcon=true, value=formData.sku, error=errors.sku)
        OnBlur: validateField("sku", formData.sku)
        OnChange: formData.sku = event.target.value

      // Type Dropdown
      Dropdown(label="Type", options=fetchTypes())
        Button("+ New Type")
          OnClick: isNewTypeModalOpen = true
      
      // Tag Multi-select
      MultiSelect(label="Tag", options=fetchTags())
        Button("+ New Tag")
          OnClick: isNewTagModalOpen = true

      // Description
      TextArea(label="Description", value=formData.description)
        OnChange: formData.description = event.target.value

    // Modals
    If isNewTypeModalOpen:
      NewTypeModal(onClose: isNewTypeModalOpen = false)
    
    If isNewTagModalOpen:
      NewTagModal(onClose: isNewTagModalOpen = false)