/**
 * Helper logic for sorting and pagination state management
 */
function handleSort(columnName) {
  if (sort.sort_by === columnName) {
    sort.sort_order = sort.sort_order === "asc" ? "desc" : "asc"
  } else {
    sort.sort_by = columnName
    sort.sort_order = "asc"
  }
  pagination.page = 1
  fetchStockOutgoings()
}

function clearFilters() {
  filters = { search: "", status: "", from_date: null, to_date: null, entity_id: null, source_id: null }
  fetchStockOutgoings()
}