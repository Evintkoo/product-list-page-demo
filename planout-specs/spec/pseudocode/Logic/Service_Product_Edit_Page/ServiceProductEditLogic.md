/**
 * Handles the initialization of the Edit Page.
 * Fetches existing ServiceProduct data to populate the form.
 */
async function loadServiceProduct(id: string) {
    const response = await fetch(`/api/service_products/${id}/edit`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error("Failed to load service product details.");
    }

    return await response.json();
}

/**
 * Handles the submission of the Edit Form.
 * Validates required fields and updates the record.
 */
async function updateServiceProduct(id: string, formData: any) {
    // Client-side validation for required fields
    const requiredFields = ['sku', 'name', 'tax_id', 'other_tax_id', 'price'];
    const errors = {};

    requiredFields.forEach(field => {
        if (!formData[field]) {
            errors[field] = "This field is required.";
        }
    });

    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    const response = await fetch(`/api/service_products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    if (response.status === 422) {
        const errorData = await response.json();
        return { success: false, errors: errorData.errors };
    }

    if (!response.ok) {
        throw new Error("An unexpected error occurred while saving.");
    }

    const updatedRecord = await response.json();
    return { success: true, data: updatedRecord };
}