FUNCTION createProduct(data):
    // Check for existing SKU
    existing = Database.Product.findOne({ sku: data.sku })
    IF existing IS NOT NULL:
        THROW SKUAlreadyExistsError

    // Prepare record
    productRecord = {
        id: GenerateUUID(),
        sku: data.sku,
        name: data.name,
        description: data.description,
        price: data.price,
        created_at: CurrentTimestamp(),
        updated_at: CurrentTimestamp()
    }

    // Persist to database
    Database.Product.insert(productRecord)
    
    RETURN productRecord