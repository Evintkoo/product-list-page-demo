/**
 * Retrieves return records for a specific customer.
 * Enforces business rules for Retail Customers only.
 */
function getCustomerReturns(customer_id: UUID) {
    // 1. Validate customer existence and type constraints
    const customer = db.Customer.findUnique({
        where: { id: customer_id }
    });

    if (!customer) {
        throw new Error("NOT_FOUND");
    }

    // Business Rule: Ensure customer is strictly Retail
    if (customer.is_wholesale || customer.is_franchise || customer.is_consignment) {
        throw new Error("NOT_FOUND");
    }

    // 2. Retrieve associated return records
    return db.ReturnRecord.findMany({
        where: { customer_id: customer_id },
        orderBy: { return_date: "desc" }
    });
}