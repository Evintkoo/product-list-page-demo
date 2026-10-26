// Node: 64535e33-0917-4a0c-94bd-cf70a296e8cd
// Title: Back to Product List page
// Description: Navigation trigger to return to the product listing view.
// Previous: "Back to Product List page" (Frontend)
// Next: None
// Logic: On click of the "Back" button, trigger a router navigation to the product list route.
// Happy Path: User clicks button, browser history pushes the product list URL.
// Validation: None required.
// Empty State: N/A.
// Side Effects: Browser navigation.
// Notes covered: Navigation trigger to return to the product listing view.

// Node: 25c76569-487e-4fdf-9105-e8a900535ee8
// Title: Product Tab
// Description: Tab selection component to switch between product information views.
// Previous: "Sub menu" (Frontend)
// Next: None
// Logic: Maintain local state `activeTab`. On click, update `activeTab` and conditionally render the corresponding sub-component.
// Happy Path: User clicks tab, state updates, view re-renders.
// Validation: Ensure `activeTab` is one of the allowed enum values (e.g., 'details', 'stock', 'history').
// Empty State: Default to 'details' tab on initial load.
// Side Effects: State update.
// Notes covered: Tab selection component to switch between product information views.

// Node: d9ab555c-1d53-4d63-bd14-48e9a776e638
// Title: Product Data Fetcher
// Description: Data retrieval for the product detail page.
// Previous: "Page Load" (Frontend)
// Next: None
// Logic: On mount, call GET /api/products/:id using the ID from the URL parameters.
// Happy Path: API returns 200 OK with product data; populate local state.
// Validation: If ID is missing or malformed, redirect to 404 or error page.
// Empty State: Show loading spinner while `isLoading` is true.
// Side Effects: API call, state population.
// Notes covered: Data retrieval for the product detail page.

// Node: 83292927-8a5b-434c-9116-cb45794018ba
// Title: Header Navigation Bar
// Description: Global navigation component for the ERP system.
// Previous: "Header Navigation Bar" (Frontend)
// Next: None
// Logic: Render links to major modules (Dashboard, Products, Inventory, etc.).
// Happy Path: Clicking a link navigates to the respective module.
// Validation: None.
// Empty State: N/A.
// Side Effects: Router navigation.
// Notes covered: Global navigation component for the ERP system.

// Node: b84dade6-024c-4b73-8a54-5d207feb0dcd
// Title: Warehouse Stock Fulfillment Details
// Description: Display stock levels and fulfillment status per warehouse.
// Previous: "Warehouse Stock Menu" (Frontend)
// Next: None
// Logic: Fetch and display warehouse-specific stock data.
// Happy Path: Table renders with warehouse name, stock count, and status.
// Validation: Handle empty stock data by displaying "No stock information available".
// Empty State: Show "No data" message if array is empty.
// Side Effects: API call to fetch stock details.
// Notes covered: Display stock levels and fulfillment status per warehouse.

// Node: f416c99d-3706-4282-907f-af4015ecddc4
// Title: Product Purchase History
// Description: Display historical purchase records for the product.
// Previous: "Purchase History Menu" (Frontend)
// Next: None
// Logic: Fetch and display a list of past purchase orders.
// Happy Path: List renders with date, quantity, and supplier information.
// Validation: None.
// Empty State: Show "No purchase history found" if list is empty.
// Side Effects: API call to fetch purchase history.
// Notes covered: Display historical purchase records for the product.

// Asset: assets/adba229c-083f-44ef-8266-5500bc46aee5.svg