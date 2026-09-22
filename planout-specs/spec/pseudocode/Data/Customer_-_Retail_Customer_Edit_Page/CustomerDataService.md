/**
 * Fetches the initial state for the Retail Customer Edit Page.
 * Combines the specific customer record and the metadata for dropdowns.
 */
FUNCTION fetchRetailCustomerEditData(customerId):
    // Fetch customer details
    customerResponse = HTTP GET /api/customers/:customerId
    
    // Fetch metadata for dropdowns (Stores, Service Taxes)
    metadataResponse = HTTP GET /api/customers/new?retail=1
    
    IF customerResponse.status == 404:
        REDIRECT TO /customers/list
        RETURN
        
    RETURN {
        customer: customerResponse.data,
        metadata: metadataResponse.data
    }

/**
 * Handles the update request for a retail customer.
 * Validates fields before transmission.
 */
FUNCTION updateRetailCustomer(customerId, formData):
    // Validation Logic
    IF LENGTH(formData.phone) < 6:
        THROW ERROR "Phone must be at least 6 characters"
    
    IF IS_EMPTY(formData.name) OR IS_EMPTY(formData.store_id) OR IS_EMPTY(formData.service_tax_id):
        THROW ERROR "Name, Store, and Service Tax are required"

    // API Call
    response = HTTP PUT /api/customers/:customerId WITH BODY formData
    
    IF response.status == 200:
        REDIRECT TO /customers/:customerId WITH MESSAGE "Customer was successfully updated"
    
    ELSE IF response.status == 422:
        // Return validation errors to the UI to highlight specific fields
        RETURN {
            status: "validation_error",
            errors: response.data.errors
        }
        
    ELSE:
        THROW ERROR "An unexpected error occurred"