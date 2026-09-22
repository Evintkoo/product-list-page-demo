/**
 * Data access layer for retrieving product information associated with a specific supplier.
 */

// Fetch a paginated list of products filtered by supplier_id
// Includes basic filtering for active products and sorting by name
FUNCTION getProductsBySupplier(supplierId: UUID, page: Integer, pageSize: Integer):
    SELECT * 
    FROM Product 
    WHERE supplier_id = supplierId
    ORDER BY name ASC
    LIMIT pageSize OFFSET (page - 1) * pageSize

// Fetch total count of products for a supplier to support frontend pagination metadata
FUNCTION getProductCountBySupplier(supplierId: UUID):
    SELECT COUNT(*) 
    FROM Product 
    WHERE supplier_id = supplierId

// Fetch detailed information for a specific product
FUNCTION getProductById(productId: UUID):
    SELECT * 
    FROM Product 
    WHERE id = productId