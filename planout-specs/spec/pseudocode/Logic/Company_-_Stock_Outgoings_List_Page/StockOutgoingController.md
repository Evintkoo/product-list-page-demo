/**
 * API Controller for Stock Outgoings List Page
 */
async function handleGetStockOutgoings(req, res) {
    const { page = 1, limit = 20, search, status } = req.query;
    
    try {
        const data = await getStockOutgoings({ 
            page: parseInt(page), 
            limit: parseInt(limit), 
            search, 
            status 
        });
        
        return res.status(200).json({
            data: data,
            meta: { page, limit }
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch stock outgoings" });
    }
}