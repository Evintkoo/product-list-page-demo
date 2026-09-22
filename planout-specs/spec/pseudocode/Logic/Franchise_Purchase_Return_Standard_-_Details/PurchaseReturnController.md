/**
 * Controller to handle API requests for Purchase Return details.
 */
const getPurchaseReturn = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getPurchaseReturnDetails(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch purchase return details" });
    }
};