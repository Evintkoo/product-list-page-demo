/**
 * Data access layer for SalesDelivery entities.
 * Handles filtering, pagination, and retrieval from the database.
 */

FUNCTION findDeliveries(filters: { status?: string, startDate?: datetime, endDate?: datetime }, pagination: { limit: int, offset: int }) {
    QUERY "SELECT * FROM SalesDelivery"
    
    // Apply dynamic filters based on provided query parameters
    IF filters.status IS NOT NULL:
        APPEND "WHERE status = :status"
    
    IF filters.startDate AND filters.endDate:
        APPEND "AND delivery_date BETWEEN :startDate AND :endDate"
        
    // Apply pagination
    APPEND "ORDER BY delivery_date DESC LIMIT :limit OFFSET :offset"
    
    RETURN database.execute(query, parameters)
}

FUNCTION countDeliveries(filters: { status?: string, startDate?: datetime, endDate?: datetime }) {
    QUERY "SELECT COUNT(*) FROM SalesDelivery"
    
    // Apply same filters as findDeliveries to ensure accurate pagination metadata
    IF filters.status IS NOT NULL:
        APPEND "WHERE status = :status"
        
    RETURN database.execute(query, parameters)
}