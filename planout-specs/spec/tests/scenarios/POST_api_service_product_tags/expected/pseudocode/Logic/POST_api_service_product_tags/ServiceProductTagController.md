/**
 * Handles the creation of a new Service Product Tag.
 * Endpoint: POST /api/service_product_tags
 */
function createServiceProductTag(request) {
    // 1. Validate Authentication
    if (!request.isAuthenticated()) {
        return respond(401, { error: "Unauthorized" });
    }

    // 2. Validate Request Body
    const { name } = request.body;
    if (!name || typeof name !== 'string' || name.trim() === "") {
        return respond(422, { errors: { name: "Name is required and must be a valid string." } });
    }

    // 3. Check for Uniqueness (Business Rule: name is unique)
    const existingTag = database.ServiceProductTag.findOne({ name: name });
    if (existingTag) {
        return respond(422, { errors: { name: "A tag with this name already exists." } });
    }

    // 4. Persist to Database
    try {
        const newTag = {
            id: generateUUID(),
            name: name.trim(),
            created_at: getCurrentTimestamp()
        };

        database.ServiceProductTag.insert(newTag);

        // 5. Return Success Response
        return respond(201, {
            id: newTag.id,
            name: newTag.name,
            created_at: newTag.created_at
        });
    } catch (error) {
        // 6. Handle Unexpected Failures
        return respond(500, { error: "An unexpected server error occurred." });
    }
}