/**
 * Handles the retrieval of a single Franchise Purchase Order header.
 * Scoped to the authenticated user's company_id.
 */
function getFranchisePurchaseOrder(request, response) {
    const { id } = request.params;
    const { company_id } = request.user; // Derived from authentication context

    // 1. Validate ID format
    if (!isValidUuid(id)) {
        return response.status(400).json({ error: "Invalid ID format", code: "INVALID_ID" });
    }

    // 2. Fetch the record
    // We filter by both ID and company_id to ensure data isolation
    const order = database.FranchisePurchaseOrder.findOne({
        where: {
            id: id,
            company_id: company_id
        }
    });

    // 3. Handle existence
    // If not found, return 404. This covers both "does not exist" 
    // and "belongs to another company" to prevent ID enumeration.
    if (!order) {
        return response.status(404).json({ 
            error: "Purchase order not found", 
            code: "NOT_FOUND" 
        });
    }

    // 4. Return the header details
    // Note: Item rows are excluded as they are handled by a separate endpoint
    return response.status(200).json({
        id: order.id,
        order_type: order.order_type,
        status: order.status,
        order_date: order.order_date,
        subtotal: order.subtotal,
        tax_total: order.tax_total,
        discount_total: order.discount_total,
        shipping_total: order.shipping_total,
        grand_total: order.grand_total,
        created_at: order.created_at
    });
}