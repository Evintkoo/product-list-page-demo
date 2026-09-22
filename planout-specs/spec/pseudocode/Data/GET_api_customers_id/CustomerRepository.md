/**
 * Fetches a customer record by ID and determines the specific type 
 * based on discriminator flags.
 */
FUNCTION getCustomerById(id: UUID):
    // 1. Retrieve raw record from Customer table
    record = DB.table("Customer").find(id)
    
    IF record IS NULL:
        THROW Error("CustomerNotFound")
    
    // 2. Determine customer type based on discriminator flags
    // Retail: is_wholesale=false, is_franchise=false, is_consignment=false
    // Wholesale: is_wholesale=true
    // Franchise: is_franchise=true
    
    RETURN record