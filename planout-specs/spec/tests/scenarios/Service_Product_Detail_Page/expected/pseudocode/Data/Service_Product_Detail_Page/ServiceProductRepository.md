/**
 * Data access layer for Service Product entities.
 * Handles retrieval of full product details including related tax and pricing configurations.
 */

FUNCTION getServiceProductById(id: UUID):
    // Fetch the primary service product record
    record = DB.query("SELECT * FROM ServiceProduct WHERE id = ?", [id])
    
    IF record IS NULL:
        THROW Error("Service Product not found")
    
    // Join with TaxCategory to provide full context for the Tax Section
    taxInfo = DB.query("SELECT * FROM TaxCategory WHERE id = ?", [record.tax_category_id])
    
    // Construct the unified response object for the API
    RETURN {
        id: record.id,
        name: record.name,
        description: record.description,
        sku: record.sku,
        settings: {
            is_active: record.is_active
        },
        tax: {
            category_name: taxInfo.name,
            rate: taxInfo.rate
        },
        pricing: {
            base_price: record.base_price,
            currency: record.currency
        },
        audit: {
            last_modified: record.updated_at
        }
    }