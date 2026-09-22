/**
 * Controller handling the API request for the Supplier Product List Page
 */
async function handleGetSupplierProducts(req, res) {
    const { supplier_id } = req.params;

    try {
        const products = await getSupplierProductList(supplier_id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve supplier products" });
    }
}