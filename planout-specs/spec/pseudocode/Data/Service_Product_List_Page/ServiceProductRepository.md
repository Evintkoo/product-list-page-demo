// Data access layer to fetch paginated service products from the database.

FUNCTION getServiceProducts(page: integer, pageSize: integer):
    OFFSET = (page - 1) * pageSize
    
    // Query the ServiceProduct entity
    DATA = SELECT * FROM ServiceProduct
           ORDER BY name ASC
           LIMIT pageSize
           OFFSET OFFSET
           
    TOTAL_COUNT = SELECT COUNT(*) FROM ServiceProduct
    
    RETURN {
        items: DATA,
        total: TOTAL_COUNT,
        page: page,
        pageSize: pageSize
    }