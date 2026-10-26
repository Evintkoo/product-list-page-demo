/**
 * Node: Page Load (1a2d71da-1b77-49db-aaf9-1e22fd5d7880)
 * Logic: Handles the initial retrieval of product data.
 * Happy Path: Fetch all products from the database and return as a JSON array.
 * Error State: Return 500 if database connection fails.
 * Empty State: Return empty array if no products exist.
 */
function getProducts() {
    // Call database to retrieve all records from Product entity
    const products = db.Product.findAll();
    return products;
}

/**
 * Node: Search Button (cb143e88-b3a6-428e-9077-3cbdb603db21)
 * Logic: Executes filtered search based on user input.
 * Happy Path: Filter Product records by provided criteria and return matching list.
 * Error State: Return 400 if filter parameters are malformed.
 * Side Effects: None.
 */
function searchProducts(filters: { SKU?: string, productName?: string, brandName?: string }) {
    // Query Product entity using provided filter values
    const results = db.Product.find({
        where: {
            SKU: filters.SKU,
            productName: filters.productName,
            brandName: filters.brandName
        }
    });
    return results;
}

/**
 * Node: Mapping rules (94f56e2f-edb0-4666-835f-90d5bf53d879)
 * Logic: Transforms internal Product entity fields to UI-facing labels.
 * Notes covered:
 * 1. SKU -> SKU
 * 2. productName -> Name
 * 3. brandName -> Brand
 * 4. productCode -> Product Code
 * 5. tax -> Tax
 * 6. price -> Price
 */
function mapProductToUI(product: Product) {
    return {
        SKU: product.SKU,
        Name: product.productName,
        Brand: product.brandName,
        "Product Code": product.productCode,
        Tax: product.tax,
        Price: product.price
    };
}

<!-- API_PAYLOAD
{
  "GET /products": {
    "request": {
      "body": [
        { "name": "page", "type": "integer" },
        { "name": "limit", "type": "integer" },
        { "name": "search", "type": "string" }
      ]
    },
    "responses": {
      "200": {
        "body": ["id", "SKU", "productName", "brandName", "productCode", "tax", "price"],
        "from": "Product"
      }
    }
  }
}
-->