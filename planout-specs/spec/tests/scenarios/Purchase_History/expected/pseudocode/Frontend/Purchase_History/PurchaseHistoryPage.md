/**
 * Component: PurchaseHistoryPage
 * Description: Displays a list of purchase records for a specific product.
 * Asset: assets/5f296374-83c4-4b33-804f-f15d049e3c4e.svg
 */

// Node: on page load (id: bfceb507-4c02-4234-b787-7e1ee0ad95e7)
// Logic: On mount, extract :id from URL and fetch data.
useEffect(() => {
  const productId = getUrlParam('id');
  fetchPurchases(productId);
}, []);

async function fetchPurchases(productId: string) {
  // API Call: GET /products/:id/purchases
  // Note: No supplier filter and default sorting by purchase_date.
  const response = await api.get(`/products/${productId}/purchases`);
  
  if (response.status === 200) {
    renderTable(response.body); // Renders PURCHASE entities
  } else if (response.status === 404) {
    showError("Purchase history not found.");
  }
}

// Node: QR Codes (id: 02fc4ff6-f04f-4ec6-87e5-6c5a1af3b6af)
// Action: Trigger display/print modal for product QR code.
<button onClick={handleQrDisplay}>QR Codes</button>

// Node: Barcode (id: 3b666040-29ed-4e69-977f-f7323179225d)
// Action: Trigger display/print modal for product barcode.
<button onClick={handleBarcodeDisplay}>Barcode</button>

// Node: Supplier filter dropdown (id: 0c2e54df-c830-4a5a-ba50-88c4f7912896)
// Action: Opens menu to select supplier.
<Dropdown icon="^" onSelect={setSupplierFilter} />

// Node: Search (id: 03f5c2e8-e5ab-429f-b6a4-30720d01ad88)
// Action: Reloads table based on selected supplier filter.
<button onClick={() => fetchPurchases(productId)}>Search</button>