/**
 * Component: ServiceProductFilterBar
 * Asset: assets/ece56b68-345c-454a-8cef-1e4e4922df65.svg
 * 
 * Manages the state for filtering Service Products. 
 * Validation is performed on-change for all inputs.
 */

State:
  filters = {
    sku: "",      // ORPHAN_FIELD: sku
    name: "",     // ORPHAN_FIELD: name
    type: "",     // ORPHAN_FIELD: type
    tag: ""       // ORPHAN_FIELD: tag
  }

Component Render:
  Row:
    Input(type="text", label="SKU", value=filters.sku, onChange=(v) => updateFilters("sku", v))
    Input(type="text", label="Name", value=filters.name, onChange=(v) => updateFilters("name", v))
    Dropdown(label="Type", options=fetchTypes(), value=filters.type, onChange=(v) => updateFilters("type", v))
    Input(type="text", label="Tag", value=filters.tag, onChange=(v) => updateFilters("tag", v))
    
    Button(label="Search", onClick=handleSearch)
    Button(label="Download", variant="transparent", icon="down-arrow", onClick=handleDownload)

Validation Logic:
  // Immediate validation triggered on input change
  Function updateFilters(field, value):
    If field == "sku" and value.length > 50:
      ShowError("SKU cannot exceed 50 characters")
    Else:
      SetState(filters[field] = value)

Event Handlers:
  Function handleSearch():
    // Triggers the list query using current filter state
    // API call logic resides in the Logic swimlane
    Call API with filters

  Function handleDownload():
    // Exports current filtered list to file
    // Uses current filter state to ensure consistency with displayed list
    TriggerExport(filters)