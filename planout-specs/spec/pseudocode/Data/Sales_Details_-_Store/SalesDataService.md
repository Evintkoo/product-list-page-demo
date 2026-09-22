/**
 * Data access layer for retrieving store-specific sales information.
 * This service handles the aggregation and filtering of sales data 
 * associated with a specific store entity.
 */

FUNCTION getSalesByStore(storeId: UUID, startDate: DateTime, endDate: DateTime):
    // Fetch all transactions for the given store within the specified date range
    QUERY transactions = SELECT * FROM SalesTransaction 
                         WHERE store_id = storeId 
                         AND transaction_date BETWEEN startDate AND endDate;
    
    RETURN transactions;

FUNCTION getStoreDetails(storeId: UUID):
    // Retrieve metadata for the store to provide context in the Sales Details view
    QUERY store = SELECT * FROM Store WHERE id = storeId;
    
    RETURN store;