/**
 * Validation logic for the incoming request body.
 */
function validateStatusUpdateRequest(data: any): CustomerStatusUpdateRequest {
    if (typeof data.is_active !== 'boolean') {
        throw new Error("Invalid request: is_active must be a boolean.");
    }
    return { is_active: data.is_active };
}

/**
 * Formats the response object to match the API contract.
 */
function formatStatusUpdateResponse(customer: Customer): CustomerStatusUpdateResponse {
    return {
        id: customer.id,
        is_active: customer.is_active,
        updated_at: customer.updated_at
    };
}