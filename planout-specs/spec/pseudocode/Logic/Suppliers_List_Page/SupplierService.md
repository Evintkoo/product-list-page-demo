/**
 * Fetches the list of suppliers from the backend.
 * @param page - Current page number for pagination
 * @param searchQuery - Optional string to filter suppliers by name or code
 */
async function fetchSuppliers(page: number = 1, searchQuery: string = "") {
  const response = await fetch(`/suppliers?is_internal=false&page=${page}&search=${searchQuery}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch supplier list");
  }

  const data = await response.json();
  return data.map(mapSupplierToTableFormat);
}

/**
 * Transforms raw API supplier objects into the UI-ready format for the Supplier Table.
 */
function mapSupplierToTableFormat(supplier) {
  return {
    supplier_id: supplier.supplier_id,
    supplier_code: supplier.supplier_code,
    name: supplier.name,
    contact_name: supplier.contact_name,
    phone: supplier.phone,
    // Combine address and country fields
    address_display: `${supplier.address}, ${supplier.country}`,
    tax_no: supplier.tax_no,
    can_spo: supplier.can_spo,
    // Determine action button label based on active status
    is_active: supplier.is_active,
    action_label: supplier.is_active ? "Deactivate" : "Activate"
  };
}