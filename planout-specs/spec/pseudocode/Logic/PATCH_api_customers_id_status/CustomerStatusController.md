/**
 * Handles the PATCH request to update a customer's active status.
 * 
 * @param {Object} req - The request object containing params and body.
 * @param {Object} res - The response object.
 */
async function updateCustomerStatus(req, res) {
    const { id } = req.params;
    const { is_active } = req.body;

    // 1. Validate input
    if (!id || typeof is_active !== 'boolean') {
        return res.status(400).json({ error: "Invalid request parameters or body" });
    }

    try {
        // 2. Authenticate user (Assuming auth middleware populates req.user)
        const updaterId = req.user?.id; <!-- MISSING_FIELD: Customer.updater_id -->
        if (!updaterId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // 3. Perform update via Service layer
        const updatedCustomer = await CustomerService.updateStatus(id, is_active, updaterId);

        if (!updatedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // 4. Return success response
        return res.status(200).json(updatedCustomer);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}