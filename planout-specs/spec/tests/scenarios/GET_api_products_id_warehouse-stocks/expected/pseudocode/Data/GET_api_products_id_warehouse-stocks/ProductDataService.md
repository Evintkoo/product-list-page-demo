/**
 * Service layer to validate existence of the product before fetching stocks.
 */

FUNCTION validateProductExists(productId: uuid):
    // Check if the product exists in the Product table
    // If not found, throw a "Product Not Found" exception
    
    LET product = DB.query(SELECT id FROM Product WHERE id = productId)
    
    IF product IS NULL:
        THROW Error("Product with ID " + productId + " does not exist.")
    
    RETURN TRUE