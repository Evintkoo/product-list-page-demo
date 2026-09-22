/**
 * Persists a new ProductTag record to the database.
 * Ensures the tag is scoped to the authenticated user's company.
 */
function createProductTag(data: { company_id: uuid, name: string, description?: string }) {
    // Check for existing tag with the same name within the same company scope
    const existingTag = db.ProductTag.findFirst({
        where: {
            company_id: data.company_id,
            name: data.name
        }
    });

    if (existingTag) {
        throw new ValidationError("A tag with this name already exists for this company.");
    }

    // Insert the new tag record
    return db.ProductTag.insert({
        id: generateUuid(),
        company_id: data.company_id,
        name: data.name,
        description: data.description || null,
        created_at: getCurrentTimestamp()
    });
}

/**
 * Retrieves a tag by ID to confirm creation success.
 */
function getProductTagById(id: uuid) {
    return db.ProductTag.findUnique({
        where: { id: id }
    });
}