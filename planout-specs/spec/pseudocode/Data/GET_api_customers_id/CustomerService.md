/**
 * Orchestrates the retrieval and mapping of customer data 
 * based on the specific schema requirements.
 */
FUNCTION fetchCustomerDetail(id: UUID):
    TRY:
        customer = CustomerRepository.getCustomerById(id)
        
        // Route to specific detail query logic based on flags
        IF customer.is_wholesale == TRUE:
            RETURN formatWholesaleCustomer(customer)
        ELSE IF customer.is_franchise == TRUE:
            RETURN formatFranchiseCustomer(customer)
        ELSE:
            RETURN formatRetailCustomer(customer)
            
    CATCH Error:
        // Map repository errors to API response codes
        IF Error == "CustomerNotFound":
            RETURN 404
        ELSE:
            RETURN 500

FUNCTION formatRetailCustomer(data):
    // Maps core_info, group, store, addresses, tax, sap, settings, audit
    RETURN mapToRetailSchema(data)

FUNCTION formatWholesaleCustomer(data):
    RETURN mapToWholesaleSchema(data)

FUNCTION formatFranchiseCustomer(data):
    RETURN mapToFranchiseSchema(data)