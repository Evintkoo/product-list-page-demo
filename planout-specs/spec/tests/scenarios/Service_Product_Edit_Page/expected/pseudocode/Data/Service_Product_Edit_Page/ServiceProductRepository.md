/**
 * Fetches the existing service product record by ID for the edit form.
 * Returns the full object including all foreign key references for dropdown population.
 */
FUNCTION getServiceProductById(id: UUID): ServiceProduct {
    RETURN DB.ServiceProduct.findUnique({
        where: { id: id }
    });
}

/**
 * Updates the service product record.
 * Validates required fields before persistence.
 */
FUNCTION updateServiceProduct(id: UUID, data: ServiceProductUpdateDTO): ServiceProduct {
    // Validation logic for required fields
    IF (data.sku IS EMPTY OR data.name IS EMPTY OR data.tax_id IS EMPTY OR data.other_tax_id IS EMPTY OR data.price IS NULL) {
        THROW ValidationError("SKU, Name, Tax, Other Tax, and Price are required.");
    }

    RETURN DB.ServiceProduct.update({
        where: { id: id },
        data: {
            sku: data.sku,
            name: data.name,
            description: data.description,
            price: data.price,
            type_id: data.type_id,
            tag_id: data.tag_id,
            tax_id: data.tax_id,
            other_tax_id: data.other_tax_id,
            account_id: data.account_id,
            tax_product_code_id: data.tax_product_code_id,
            tax_unit_of_measure_id: data.tax_unit_of_measure_id,
            updated_at: CURRENT_TIMESTAMP
        }
    });
}