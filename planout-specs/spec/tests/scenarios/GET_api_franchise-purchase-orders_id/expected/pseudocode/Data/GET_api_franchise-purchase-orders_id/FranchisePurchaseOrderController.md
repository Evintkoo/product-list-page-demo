/**
 * API Controller for GET /api/franchise-purchase-orders/:id
 */
async function handleGetFranchisePurchaseOrder(req, res) {
  try {
    const { id } = req.params;
    const user = req.user; // Populated by Auth Middleware

    const order = FranchisePurchaseOrderService.getFranchisePurchaseOrderDetails(id, user);

    return res.status(200).json({
      id: order.id,
      order_type: order.order_type,
      status: order.status,
      order_date: order.order_date,
      totals: {
        subtotal: order.subtotal,
        tax_total: order.tax_total,
        discount_total: order.discount_total,
        shipping_total: order.shipping_total,
        grand_total: order.grand_total
      }
    });
  } catch (error) {
    if (error instanceof BadRequestError) return res.status(400).send();
    if (error instanceof NotFoundError) return res.status(404).send();
    return res.status(500).send();
  }
}