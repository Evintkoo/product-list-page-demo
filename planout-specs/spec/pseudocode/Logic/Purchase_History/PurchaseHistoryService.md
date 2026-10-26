/**
 * Node: 30539026-dc17-4f1a-a622-a75e9e42b3cd
 * Title: GET /products/:id/purchases
 * Previous Node: on page load (Frontend)
 */

FUNCTION getProductPurchaseHistory(productId) {
    // 1. Validate input
    IF (productId IS NULL OR productId IS EMPTY) {
        RETURN ERROR 400 "Invalid product identifier";
    }

    // 2. Database Query
    // Fetch all purchase records associated with the provided product ID
    // Ordered by purchase_date descending by default
    TRY {
        records = READ FROM PURCHASE WHERE product_id = productId 
                  ORDER BY purchase_date DESC;
        
        IF (records IS EMPTY) {
            RETURN []; // Return empty list for no history found
        }

        RETURN records;
    } CATCH (databaseError) {
        RETURN ERROR 500 "Internal server error";
    }
}

// Notes covered:
// - When the Purchase History page is first loaded, the system automatically reads the current product id
// - Calls the purchase history endpoint (GET /api/products/:id/purchases)
// - Default parameters — no supplier filter
// - Default sorting by purchase date
// - The returned purchase records are then rendered into the table below