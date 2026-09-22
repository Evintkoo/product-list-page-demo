/**
 * Repository layer to ensure data consistency and provide 
 * optimized access patterns for the Sales Details - Store feature.
 */

FUNCTION getAggregatedSalesMetrics(storeId: UUID):
    // Calculate total revenue and transaction count for the store
    QUERY metrics = SELECT 
        SUM(total_amount) AS total_revenue, 
        COUNT(id) AS transaction_count 
        FROM SalesTransaction 
        WHERE store_id = storeId;
        
    RETURN metrics;