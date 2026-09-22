/**
 * Handles the retrieval of the supplier list for the authenticated user's company.
 */
function getSupplierList(request, response) {
    try {
        // 1. Validate Authentication
        const user = authenticateRequest(request);
        if (!user) {
            return response.status(401).json({ error: "Unauthorized" });
        }

        // 2. Fetch data using the Supplier Service
        // The company_id is derived from the authenticated user's session/token
        const suppliers = SupplierService.findAllByCompany(user.company_id);

        if (!suppliers) {
            return response.status(404).json({ error: "Resource not found" });
        }

        // 3. Return the list
        return response.status(200).json(suppliers);

    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}