/**
 * Handles the submission logic for the New Product Tag Modal.
 * Validates input and interacts with the product tag API.
 */
FUNCTION handleSaveProductTag(formData):
    // 1. Validation
    IF formData.name IS EMPTY OR TRIM(formData.name) == "":
        SET validationError = "Name is required."
        DISPLAY validationError UNDER "Name" FIELD
        RETURN // Keep modal open

    // 2. API Execution
    TRY:
        response = CALL POST /api/products/tags WITH {
            name: formData.name,
            description: formData.description <!-- MISSING_FIELD: PRODUCT_TAG.description -->
        }

        IF response.status == 201:
            // 3. Success Handling
            NEW_TAG = response.data
            
            // Update UI state in the parent Product Add/Edit page
            INVOKE updateProductTagSelector(NEW_TAG)
            INVOKE selectProductTag(NEW_TAG.id)
            INVOKE refreshTagList()
            
            // Close the modal
            INVOKE closeModal()
            
        ELSE IF response.status == 422:
            DISPLAY "Validation failed. Please check your input."
            
    CATCH error:
        DISPLAY "An unexpected error occurred. Please try again."
        LOG error