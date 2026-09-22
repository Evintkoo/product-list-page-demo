/**
 * Checks if a product with the given SKU already exists in the database.
 * Used to enforce uniqueness constraints before insertion.
 */
FUNCTION findProductBySku(sku):
    RETURN database.query("SELECT id FROM Product WHERE sku = ?", [sku])

/**
 * Persists a new product record to the database.
 * Automatically generates the ID and timestamps.
 */
FUNCTION createProduct(productData):
    SET newProduct = {
        id: generateUuid(),
        sku: productData.sku,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        created_at: getCurrentTimestamp(),
        updated_at: getCurrentTimestamp()
    }
    
    database.execute(
        "INSERT INTO Product (id, sku, name, description, price, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [newProduct.id, newProduct.sku, newProduct.name, newProduct.description, newProduct.price, newProduct.created_at, newProduct.updated_at]
    )
    
    RETURN newProduct