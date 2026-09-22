// Interface for interacting with the Customer and related tables.

interface CustomerRepository {
  // Fetch paginated list of customers using keyset cursor
  listCustomers(params: { 
    cursor?: string, 
    limit: number, 
    filters: CustomerFilter 
  }): Promise<Customer[]>;

  // Get full customer profile including addresses and billing
  getCustomerById(id: UUID): Promise<CustomerProfile>;

  // Create or update customer with atomic transaction for sub-entities
  saveCustomer(data: CustomerInput): Promise<Customer>;
}