/**
 * Handles the initialization of the New Stock Transfer page.
 */
async function onPageLoad() {
  // 1. Verify authentication
  const user = await fetch("/api/auth/me");
  if (!user.ok) {
    redirectTo("/login");
    return;
  }

  // 2. Populate location dropdowns
  const locations = await fetch("/api/stores");
  populateDropdowns(locations);

  // 3. Set defaults
  setFieldValue("transfer_type", "Sent");
  clearFields(["ref_code", "due_date", "notes"]);
  initializeEmptyProductsTable();
}

/**
 * Handles product search within the table row.
 */
async function handleProductSearch(query: string, sourceLocationId: uuid) {
  if (!sourceLocationId) {
    showError("Please select a source location first.");
    return;
  }
  
  const results = await fetch(`/api/stock-transfers/product-lookup?search=${query}`);
  return results.json();
}

/**
 * Submits the new stock transfer document.
 */
async function handleSaveTransfer(formData: any, tableRows: any[]) {
  // Validation
  if (tableRows.length === 0) throw new Error("Product table cannot be empty.");
  if (formData.source_location_id === formData.destination_location_id) {
    throw new Error("Source and destination locations must be different.");
  }

  const payload = {
    source_location_id: formData.source_location_id,
    destination_location_id: formData.destination_location_id,
    ref_code: formData.ref_code,
    due_date: formData.due_date,
    notes: formData.notes,
    items: tableRows.map(row => ({
      product_id: row.product_id,
      transferred_qty: row.transferred_qty
    }))
  };

  const response = await fetch("/api/stock-transfers", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const data = await response.json();
    navigateTo(`/stock-transfers/${data.id}`);
  } else {
    const error = await response.json();
    displayValidationError(error.reason);
  }
}