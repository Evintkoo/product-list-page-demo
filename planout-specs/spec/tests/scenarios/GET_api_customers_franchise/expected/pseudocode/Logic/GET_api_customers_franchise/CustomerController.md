/**
 * Handles the retrieval of franchise-specific customer records.
 */
function getFranchiseCustomers(request, response) {
    try {
        // 1. Authentication Check
        if (!request.isAuthenticated()) {
            return response.status(401).json({ error: "Unauthorized: Authentication required" });
        }

        // 2. Authorization Check
        // Ensure the caller has the necessary permissions to view franchise data
        if (!request.user.hasPermission("view_franchise_customers")) {
            return response.status(403).json({ error: "Forbidden: Insufficient permissions" });
        }

        // 3. Data Retrieval
        // Fetch customers where is_franchise is true
        const franchiseCustomers = CustomerService.findFranchiseCustomers();

        // 4. Return Success
        return response.status(200).json(franchiseCustomers);

    } catch (error) {
        // 5. Error Handling
        return response.status(500).json({ error: "Internal Server Error" });
    }
}