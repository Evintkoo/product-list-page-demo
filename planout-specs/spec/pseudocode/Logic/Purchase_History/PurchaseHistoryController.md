/**
 * API Controller for handling GET /products/:id/purchases
 */
function handleGetPurchaseHistory(request) {
    const { id } = request.params;

    try {
        const data = getPurchaseHistory(id);
        return {
            status: 200,
            body: data
        };
    } catch (error) {
        return {
            status: 500,
            body: { message: "Failed to retrieve purchase history" }
        };
    }
}