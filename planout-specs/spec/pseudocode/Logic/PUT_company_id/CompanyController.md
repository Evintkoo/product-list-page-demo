/**
 * Handles the PUT /company/:id request to update an existing company.
 */
function updateCompany(request, response) {
    const { id } = request.params;
    const { name, tax_id, address } = request.body;

    // 1. Validate Authentication
    if (!isAuthenticated(request)) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    // 2. Fetch existing record
    const existingCompany = Database.Company.findOne({ id: id });
    if (!existingCompany) {
        return response.status(404).json({ error: "Company not found" });
    }

    // 3. Validate business rules (e.g., unique tax_id check)
    if (tax_id && tax_id !== existingCompany.tax_id) {
        const duplicate = Database.Company.findOne({ tax_id: tax_id });
        if (duplicate) {
            return response.status(422).json({ errors: ["tax_id already in use"] });
        }
    }

    // 4. Prepare update payload
    const updateData = {
        name: name || existingCompany.name,
        tax_id: tax_id || existingCompany.tax_id,
        address: address || existingCompany.address,
        updated_at: getCurrentTimestamp() <!-- MISSING_FIELD: Company.updated_at -->
    };

    // 5. Perform update
    try {
        const updatedCompany = Database.Company.update(
            { id: id },
            updateData
        );

        return response.status(200).json(updatedCompany);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}