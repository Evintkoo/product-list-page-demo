/**
 * Logic handler for the New Product Brand Modal.
 * Validates input and manages the lifecycle of the brand creation request.
 */

FUNCTION handleSaveBrand(formData):
    // 1. Validation
    IF isNullOrEmpty(formData.name) THEN
        SET validationError = "Brand name is required."
        DISPLAY validationError UNDER "Name" FIELD
        RETURN // Keep modal open
    ENDIF

    // 2. API Execution
    TRY
        response = CALL POST /api/products/brand WITH {
            name: formData.name,
            description: formData.description
        }

        // 3. Success Handling
        IF response.status == 201 THEN
            // Update parent state (Product Brand dropdown)
            TRIGGER updateBrandDropdown(response.data)
            TRIGGER selectBrand(response.data.id)
            
            // Refresh global brand list cache
            TRIGGER refreshBrandList()
            
            // Close modal
            TRIGGER closeModal()
        ENDIF

    CATCH error:
        // 4. Error Handling
        IF error.status == 422 THEN
            DISPLAY error.message UNDER "Name" FIELD
        ELSE
            DISPLAY "An unexpected error occurred. Please try again."
        ENDIF
    ENDTRY

// Note: The following fields are assumed to exist in the schema for the brand entity
// <!-- MISSING_FIELD: PRODUCT_BRAND.name -->
// <!-- MISSING_FIELD: PRODUCT_BRAND.description -->