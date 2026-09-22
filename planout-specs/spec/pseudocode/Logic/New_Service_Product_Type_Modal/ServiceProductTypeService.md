/**
 * Logic handler for the New Service Product Type Modal.
 * Orchestrates the submission of form data to the backend.
 */

FUNCTION handleSaveServiceProductType(formData):
    // 1. Validate form inputs
    IF formData.name IS EMPTY:
        THROW Error("Service product type name is required.") <!-- MISSING_FIELD: SERVICE_PRODUCT_TYPE.name -->

    // 2. Prepare payload for API
    // Mapping form state to the expected API schema
    payload = {
        name: formData.name,
        description: formData.description, <!-- MISSING_FIELD: SERVICE_PRODUCT_TYPE.description -->
        is_active: formData.is_active OR true <!-- MISSING_FIELD: SERVICE_PRODUCT_TYPE.is_active -->
    }

    // 3. Execute API call
    TRY:
        response = POST /api/service_product_types WITH payload
        
        IF response.status == 201:
            RETURN { success: true, data: response.body }
        ELSE:
            RETURN { success: false, error: "Failed to create service product type." }
            
    CATCH error:
        LOG error
        RETURN { success: false, error: error.message }