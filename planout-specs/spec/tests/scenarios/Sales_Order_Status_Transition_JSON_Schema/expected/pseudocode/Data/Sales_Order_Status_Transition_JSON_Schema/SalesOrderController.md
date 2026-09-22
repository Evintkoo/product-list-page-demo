/**
 * API Controller for POST /api/sales-order/:id/status/:status
 */
async function handleStatusTransition(req, res) {
  const { id: salesOrderId, status: targetStatus } = req.params;
  const { company_id } = req.session;
  const { user_id } = req.user;

  try {
    // Validate targetStatus enum
    if (!['approved', 'cancelled'].includes(targetStatus)) {
      return res.status(400).json({ error: "Invalid status transition" });
    }

    const result = await transitionSalesOrderStatus(
      salesOrderId,
      company_id,
      targetStatus,
      user_id
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(409).json({ error: error.message });
  }
}