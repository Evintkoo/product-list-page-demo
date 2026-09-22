/**
 * Business logic layer to process store data retrieval.
 */

FUNCTION getStoreList():
    // Retrieve raw data from the repository
    stores = StoreRepository.fetchAllStores()
    
    // Map database entities to the API response format
    response = MAP stores TO {
        "id": stores.id,
        "name": stores.name,
        "locationCode": stores.location_code,
        "isActive": stores.is_active
    }
    
    RETURN response