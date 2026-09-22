/**
 * Controller to handle retrieval of inactive service products.
 */
FUNCTION GET_INACTIVE_SERVICE_PRODUCTS(request):
    // 1. Validate Authentication
    IF NOT IS_AUTHENTICATED(request):
        RETURN HTTP 401 "Unauthorized"

    // 2. Extract optional filters from query parameters
    SET type_filter = request.query.type_id
    SET tag_filter = request.query.tag_id

    // 3. Validate existence of referenced filters if provided
    IF type_filter IS NOT NULL AND NOT EXISTS_IN_DB("ServiceProductType", type_filter):
        RETURN HTTP 404 "Type ID not found"
    
    IF tag_filter IS NOT NULL AND NOT EXISTS_IN_DB("ServiceProductTag", tag_filter):
        RETURN HTTP 404 "Tag ID not found"

    // 4. Query the database for inactive products
    // We filter by active = false as per business requirements
    TRY:
        SET query = SELECT * FROM ServiceProduct WHERE active = false
        
        IF type_filter IS NOT NULL:
            APPEND "AND type_id = type_filter" TO query
            
        IF tag_filter IS NOT NULL:
            APPEND "AND tag_id = tag_filter" TO query
            
        SET results = EXECUTE_QUERY(query)
        
        // 5. Return the paginated list
        RETURN HTTP 200 OK (results)

    CATCH database_error:
        RETURN HTTP 500 "Internal Server Error"