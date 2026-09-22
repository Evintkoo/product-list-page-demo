/**
 * Controller to handle retrieval of customer details.
 */
function getCustomerById(req, res) {
    const { id } = req.params;

    // Validate UUID format for :id
    if (!isValidUuid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    // Ensure user authentication
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const customer = CustomerService.findCustomerById(id);

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        return res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}