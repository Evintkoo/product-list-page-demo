/**
 * Controller to orchestrate page load data requirements.
 */

ON PAGE LOAD:
    // Execute parallel requests to populate the page
    mappings = CALL getPaymentTypeMappings({})
    options = CALL getDropdownOptions()
    
    // Return combined state to the frontend
    RETURN {
        tableData: mappings,
        storeOptions: options.stores,
        paymentTypeOptions: options.paymentTypes
    }
END ON

// Handle filter changes
ON FILTER CHANGE(newFilters):
    updatedMappings = CALL getPaymentTypeMappings(newFilters)
    UPDATE UI.tableData WITH updatedMappings
END ON