/**
 * Controller for GET /api/sales-order-returns/:id
 */
async function handleGetSalesOrderReturn(req, res) {
    try {
        const { id } = req.params;
        const { companyId } = req.session; // Derived from authenticated session

        if (!companyId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const data = await getSalesOrderReturnDetail(id, companyId);
        return res.status(200).json(data);

    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}