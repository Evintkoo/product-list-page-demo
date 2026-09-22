/**
 * Handles the retrieval of a single supplier record.
 * Ensures data isolation by verifying the supplier belongs to the authenticated user's company.
 */
async function getSupplierById(req, res) {
    const { id } = req.params;
    const { company_id } = req.user; // Derived from session/auth context

    // 1. Validate input
    if (!isValidUUID(id)) {
        return res.status(400).json({ error: "Invalid supplier ID format" });
    }

    try {
        // 2. Query Supplier record
        // Logic: Fetch supplier where id matches and company_id matches the authenticated user's company
        const supplier = await db.Supplier.findOne({
            where: {
                id: id,
                company_id: company_id
            }
        });

        // 3. Handle Not Found
        if (!supplier) {
            return res.status(404).json({ error: "Supplier not found or access denied" });
        }

        // 4. Return success
        return res.status(200).json(supplier);

    } catch (error) {
        // 5. Handle unexpected failures
        console.error("Error fetching supplier:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Helper function to validate UUID format
function isValidUUID(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
}