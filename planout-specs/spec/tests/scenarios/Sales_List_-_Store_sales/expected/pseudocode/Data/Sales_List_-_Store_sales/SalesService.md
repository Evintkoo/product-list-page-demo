/**
 * Orchestrates the data retrieval for the Sales List feature.
 * Ensures the data structure matches the frontend mapping requirements.
 */
FUNCTION fetchSalesData(page: integer, pageSize: integer):
    SET offset = (page - 1) * pageSize;
    
    // Call repository to get paginated data
    SET response = SalesRepository.getSalesList(pageSize, offset);
    
    // Return the structured response to the API controller
    RETURN response;