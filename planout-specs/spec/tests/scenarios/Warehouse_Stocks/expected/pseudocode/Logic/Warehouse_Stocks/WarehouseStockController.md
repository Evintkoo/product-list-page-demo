/**
 * Controller handler for GET /api/products/:id/warehouse-stocks
 */
async function handleGetWarehouseStocks(req, res) {
    const { id } = req.params;
    
    try {
        const result = await getWarehouseStocksByProduct(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve warehouse stock data" });
    }
}