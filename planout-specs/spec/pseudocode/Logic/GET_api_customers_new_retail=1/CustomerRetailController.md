/**
 * Handles the initialization data for Retail Customer forms.
 * Provides dropdown options and default values required for the UI.
 */
FUNCTION GET_RetailCustomerForm(request):
    // 1. Authentication Check
    IF NOT request.user_is_authenticated:
        RETURN 401, { "error": "Unauthorized" }

    TRY:
        // 2. Fetch required dropdown data
        // Fetch all available stores for the retail context
        SET stores = READ Store.findAll()
        
        // Fetch occupation list for customer profiling
        SET occupations = READ Occupation.findAll()
        
        // Fetch customer groups for categorization
        SET customer_groups = READ CustomerGroup.findAll()
        
        // Fetch tax configurations
        SET taxes = READ Tax.findAll()
        
        // 3. Determine defaults
        // Identify the tax that should be selected by default
        SET default_tax = READ Tax.findOne(is_always_use = TRUE)
        
        // 4. Construct Response
        SET response_data = {
            "stores": stores,
            "occupations": occupations,
            "customer_groups": customer_groups,
            "taxes": taxes,
            "default_tax_id": default_tax.id <!-- MISSING_FIELD: Tax.id -->
        }
        
        RETURN 200, response_data

    CATCH error:
        // Log error for internal monitoring
        LOG_ERROR("Failed to load retail customer form data", error)
        RETURN 500, { "error": "Internal Server Error" }