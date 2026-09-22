/**
 * Service layer for Customer entity operations.
 */
const CustomerService = {
    /**
     * Queries the database for all customers marked as franchises.
     */
    findFranchiseCustomers: () => {
        // Query the Customer entity where is_franchise is true
        return Database.query("SELECT id, name, email, is_franchise, franchise_id, created_at FROM Customer WHERE is_franchise = true");
    }
};