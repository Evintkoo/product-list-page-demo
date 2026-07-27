// Thin data-access layer responsible for translating the query object
// into actual storage calls against the Product entity.

FUNCTION createQuery():
    RETURN new QueryBuilder(entity = "Product")
END FUNCTION

FUNCTION execute(query):
    // Runs the constructed query and returns matching Product records
    RETURN storage.find("Product", query.toStorageFilters())
END FUNCTION

FUNCTION count(query):
    // Returns count of Product records matching filters, ignoring limit/offset
    RETURN storage.count("Product", query.toStorageFilters())
END FUNCTION