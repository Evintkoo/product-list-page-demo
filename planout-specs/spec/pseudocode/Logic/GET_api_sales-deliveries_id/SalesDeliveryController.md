/**
 * Controller for handling Sales Delivery detail requests.
 * Ensures requests are scoped to the authenticated user's company.
 */
function getSalesDeliveryById(request, response) {
    // 1. Validate Authentication
    const session = getAuthenticatedSession(request);
    if (!session) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    const { id } = request.params;
    const companyId = session.company_id;

    // 2. Execute Query
    // Fetch the SalesDelivery header and associated SalesDeliveryItems
    const delivery = database.SalesDelivery.findFirst({
        where: {
            id: id,
            company_id: companyId
        }
    });

    // 3. Handle Not Found
    if (!delivery) {
        return response.status(404).json({ error: "Sales delivery not found" });
    }

    // 4. Fetch Line Items
    const items = database.SalesDeliveryItem.findMany({
        where: {
            sales_delivery_id: delivery.id
        }
    });

    // 5. Return Response
    return response.status(200).json({
        id: delivery.id,
        status: delivery.status,
        created_at: delivery.created_at,
        items: items.map(item => ({
            id: item.id,
            product_name: item.product_name,
            quantity: item.quantity
        }))
    });
} catch (error) {
    return response.status(500).json({ error: "Internal Server Error" });
}