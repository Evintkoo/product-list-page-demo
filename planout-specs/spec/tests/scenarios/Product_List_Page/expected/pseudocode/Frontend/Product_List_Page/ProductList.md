// Node: Page Load (1a2d71da-1b77-49db-aaf9-1e22fd5d7880)
// Asset: assets/67ab07a3-36e5-4169-bc37-60c90863d1d8.svg
useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  const response = await fetch("/products", { method: "GET" });
  const data = await response.json();
  setProductList(data);
};
// Notes covered: During page load, call the /api/products and load the respective data. Map the JSON response with the following mapping rules.

// Node: Mapping rules (94f56e2f-edb0-4666-835f-90d5bf53d879)
// Logic: Maps JSON keys to UI columns: SKU -> SKU, productName -> Name, brandName -> Brand, productCode -> Product Code, tax -> Tax, price -> Price.
// Notes covered: The following is mapping rules from the JSON response to the elements on the screens: 1. SKU -> SKU, 2. productName -> Name, 3. brandName -> Brand, 4. productCode -> Product Code, 5. tax -> Tax, 6. price -> Price.

// Node: Tax Column (cfa19c08-b1c0-43c1-a7a8-ec039d7cbc6b)
// Display: {product.tax}
// Notes covered: This column displays the applicable tax rate for each product row, used when calculating the final total.

// Node: Column: Price (183c4335-8965-4c35-918f-f2b6e06bffd3)
// Display: {product.price}
// Interaction: Dropdown filter for price range <!-- ORPHAN_FIELD: priceRangeFilter -->
// Notes covered: This column shows the current product price and includes a dropdown to filter by price range.

// Node: Item Name Column (9e425353-2aef-4121-8dbe-e423a2aeda90)
// Display: {product.productName}
// Interaction: Sort chevron for alphabetical ordering.
// Notes covered: Primary column showing the item name, with a sort chevron so the table can be ordered alphabetically.

// Node: Product Brand Column (6a43abed-d3bd-47b7-9a8e-52c188ee21e8)
// Display: {product.brandName}
// Notes covered: This column shows the product brand associated with each item, allowing users to identify or filter rows by manufacturer.

// Node: Product Code Column (47ae5be1-126a-4754-9e83-14063f13935d)
// Display: {product.productCode}
// Notes covered: This column displays the internal product code assigned to each item, used for cross-referencing catalog entries.

// Node: SKU Collumn (9c2ba9f1-4914-4fe7-972f-7f3e7b5b66ec)
// Display: {product.SKU}
// Notes covered: This column displays the unique SKU code for each product row, used for inventory lookup.

// Node: Main menu (3efa8f68-3fa1-41a3-b7ce-d12bc6d383f6)
// Interaction: Navigates to Common Component.
// Notes covered: This main menu will connect to the Common Component.