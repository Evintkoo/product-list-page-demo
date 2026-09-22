/**
 * Custom hook to manage filter state and API synchronization.
 */

Hook useServiceProductFilters:
  State:
    filterState = { sku: "", name: "", type: "", tag: "" }

  Function setFilter(key, value):
    // Validation logic
    If key == "name" and value.length > 100:
      Throw Error("Name too long")
    
    Update filterState[key] = value

  Return { filterState, setFilter }