/**
 * Controller logic for GET /api/customers/:id/returns
 */
async function handleGetCustomerReturns(req, res) {
    const { id } = req.params;

    // 1. Validate ID format
    if (!isValidUUID(id)) {
        return res.status(400).json({ error: "Malformed customer_id" });
    }

    try {
        // 2. Fetch data via repository
        const returns = await getCustomerReturns(id);
        
        // 3. Return success response
        return res.status(200).json({
            data: returns,
            meta: { count: returns.length }
        });
    } catch (error) {
        // 4. Error handling mapping
        if (error.message === "NOT_FOUND") {
            return res.status(404).json({ error: "Retail Customer not found" });
        }
        
        // Default to 500 for unexpected issues
        return res.status(500).json({ error: "Internal Server Error" });
    }
}