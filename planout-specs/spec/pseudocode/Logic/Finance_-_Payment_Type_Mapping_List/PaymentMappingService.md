/**
 * Service to handle data retrieval and mapping for the Payment Type Mapping feature.
 */

// Fetches the list of payment type mappings with optional filtering
FUNCTION getPaymentTypeMappings(filters: { store_id?: string, payment_type_id?: string, is_active?: boolean })
    // Maps UI filter parameters to API query parameters
    query = {
        store_id: filters.store_id,
        payment_type_id: filters.payment_type_id,
        is_active: filters.is_active
    }
    
    response = CALL GET /payment-type-mappings WITH query
    
    // Transform API response to UI-friendly format using defined mapping rules
    RETURN response.map(item => ({
        id: item.id,
        store_name: item.store,           // Mapping: store -> store_name
        payment_type_name: item.payment_type, // Mapping: payment_type -> payment_type_name
        is_active: item.active            // Mapping: active -> is_active
    }))
END FUNCTION

// Fetches data for dropdown options
FUNCTION getDropdownOptions()
    // Fetch stores for the Store dropdown
    stores = CALL GET /stores
    
    // Fetch payment types for the Payment Type dropdown
    paymentTypes = CALL GET /payment-types
    
    RETURN {
        stores: stores,
        paymentTypes: paymentTypes
    }
END FUNCTION