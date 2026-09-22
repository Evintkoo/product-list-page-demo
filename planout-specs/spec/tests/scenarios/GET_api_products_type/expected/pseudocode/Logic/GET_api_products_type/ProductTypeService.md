// The service layer handles the interaction with the ProductType entity
// and ensures business rules regarding sorting and filtering are applied.

FUNCTION fetchProductTypes(filter, pagination):
    // Business Rule: Results are sorted by productTypeName ascending.
    // Business Rule: q filters ProductType.productTypeName (case-insensitive).
    
    TRY:
        RETURN Database.ProductType.query(
            where: { productTypeName: { contains: filter.q } },
            sort: { productTypeName: "ASC" },
            pagination: pagination
        )
    CATCH Exception:
        LOG "Error retrieving product types: " + Exception.message
        THROW 500 Internal Server Error