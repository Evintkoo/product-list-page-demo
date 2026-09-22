/**
 * Orchestrates the retrieval of the supplier list.
 * Handles business logic scoping and error mapping.
 */
function fetchSupplierList(userContext: UserContext): List<Supplier> {
    // Ensure user is authenticated
    if (!userContext.isAuthenticated) {
        throw new UnauthorizedError("Authentication missing or invalid");
    }

    try {
        const suppliers = SupplierRepository.getSuppliersByCompany(userContext.companyId);
        
        if (!suppliers) {
            throw new NotFoundError("Supplier list could not be retrieved");
        }
        
        return suppliers;
    } catch (error) {
        // Log internal error and rethrow for controller handling
        Logger.error("Failed to fetch supplier list", error);
        throw new InternalServerError("Unexpected server failure");
    }
}