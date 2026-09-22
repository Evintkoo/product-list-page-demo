/**
 * Logic to handle the initialization and filtering of the Discrepancy Stocks list.
 */

async function initializeDiscrepancyPage() {
  // 1. Verify session
  const user = await fetch("/api/auth/me");
  if (!user.ok) {
    redirectTo("/login");
    return;
  }

  // 2. Load initial data
  return await fetchDiscrepancyStocks({ limit: 20, offset: 0 });
}

async function fetchDiscrepancyStocks(filters) {
  // Construct query string from provided filters (sku, product_name, status, etc.)
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`/api/discrepancy-stocks?${query}`);
  
  if (response.ok) {
    const data = await response.json();
    return mapDiscrepancyData(data);
  }
}

/**
 * Mapping rules to transform API response to UI table format
 */
function mapDiscrepancyData(items) {
  return items.map((item, index) => ({
    rowNumber: index + 1,
    date: item.created_at,
    entity: item.entity_name, <!-- MISSING_FIELD: DiscrepancyStock.entity_name -->
    documentRefCode: item.ref_code, <!-- MISSING_FIELD: DiscrepancyStock.ref_code -->
    reference: item.reference, <!-- MISSING_FIELD: DiscrepancyStock.reference -->
    productSku: item.product_sku, <!-- MISSING_FIELD: Product.sku -->
    product: item.product_name, <!-- MISSING_FIELD: Product.name -->
    quantity: item.quantity, <!-- MISSING_FIELD: DiscrepancyStock.actual_quantity -->
    notes: item.notes, <!-- MISSING_FIELD: DiscrepancyStock.discrepancy_reason -->
    feedback: item.feedback, <!-- MISSING_FIELD: DiscrepancyStock.feedback -->
    status: item.aasm_state, <!-- MISSING_FIELD: DiscrepancyStock.status -->
    actions: ["Show", "Respond"]
  }));
}