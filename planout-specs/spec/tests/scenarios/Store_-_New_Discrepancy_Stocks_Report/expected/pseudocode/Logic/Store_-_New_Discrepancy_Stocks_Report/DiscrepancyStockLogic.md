/**
 * Initializes the page state.
 * 1. Verify authentication via GET /api/auth/me.
 * 2. Fetch active stores via GET /api/stores to populate the Entity Field.
 * 3. Initialize the Products Table with one empty row.
 */
async function initializePage() {
  const user = await fetch("/api/auth/me");
  if (!user) {
    redirectTo("/login");
    return;
  }

  const stores = await fetch("/api/stores");
  setEntityOptions(stores);
}

/**
 * Handles adding a new row to the Products Table.
 * The product search triggers on keystroke.
 */
async function handleSearchProducts(query: string) {
  // Calls GET /api/products?search={query}&pagination={...}
  return await fetch(`/api/products?search=${query}`);
}

function addProductRow() {
  const newRow = {
    product_id: null,
    quantity: 0,
    notes: ""
  };
  setProductsTable(prev => [...prev, newRow]);
}

function removeProductRow(index: number) {
  setProductsTable(prev => prev.filter((_, i) => i !== index));
}

/**
 * Submits the form to create a new Discrepancy Stock record.
 */
async function handleSave() {
  const payload = {
    entity_id: selectedEntityId,
    items: productsTable.map(row => ({
      product_id: row.product_id,
      quantity: row.quantity,
      notes: row.notes
    }))
  };

  try {
    const response = await fetch("/api/discrepancy-stocks", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      navigateTo("/discrepancy-stocks");
    }
  } catch (error) {
    // Validation errors handled by UI state (e.g., highlighting empty fields)
    displayValidationErrors(error);
  }
}

function handleCancel() {
  navigateTo("/discrepancy-stocks");
}