/**
 * Orchestrates business logic for Brand creation.
 */
function handleCreateBrand(requestBody, authenticatedUser) {
    // 1. Validate required fields
    if (!requestBody.name) {
        throw new Error("VALIDATION_ERROR: Name is required");
    }

    // 2. Check for existing brand name within the user's company scope
    const existingBrand = findBrandByNameAndCompany(requestBody.name, authenticatedUser.company_id);
    if (existingBrand) {
        throw new Error("CONFLICT_ERROR: Brand with this name already exists");
    }

    // 3. Prepare data and persist
    const newBrand = {
        company_id: authenticatedUser.company_id,
        name: requestBody.name,
        description: requestBody.description || null
    };

    return createBrand(newBrand);
}