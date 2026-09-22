/**
 * Hook to manage the state and submission lifecycle of the modal.
 */

FUNCTION useServiceProductTypeModal():
    state = {
        isSubmitting: false,
        error: null
    }

    FUNCTION submit(formData):
        SET state.isSubmitting = TRUE
        result = CALL handleSaveServiceProductType(formData)
        
        IF result.success:
            CLOSE_MODAL()
            TRIGGER_EVENT("SERVICE_PRODUCT_TYPE_CREATED", result.data)
        ELSE:
            SET state.error = result.error
        
        SET state.isSubmitting = FALSE

    RETURN { state, submit }