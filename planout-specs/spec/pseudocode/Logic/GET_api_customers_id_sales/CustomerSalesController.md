/**
 * Controller to handle retrieval of sales history for a specific retail customer.
 */
function getCustomerSales(request, response) {
    const customerId = request.params.id;

    // 1. Validate authentication and authorization
    if (!isAuthenticated(request)) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    if (!hasPermission(request.user, "READ_CUSTOMER_SALES")) {
        return response.status(403).json({ error: "Forbidden" });
    }

    // 2. Verify customer existence
    const customer = database.Customer.findUnique({
        where: { id: customerId }
    });

    if (!customer) {
        return response.status(404).json({ error: "Customer not found" });
    }

    // 3. Fetch sales records associated with the customer
    try {
        const sales = database.Sale.findMany({
            where: { customer_id: customerId },
            orderBy: { purchased_at: "desc" }
        });

        // 4. Return the list of purchases
        return response.status(200).json(sales);
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}