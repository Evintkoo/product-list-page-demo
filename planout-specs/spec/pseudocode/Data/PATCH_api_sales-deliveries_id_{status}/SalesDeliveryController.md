/**
 * API Controller for PATCH /api/sales-deliveries/:id/:status
 */
async function handlePatchDeliveryStatus(req, res) {
  const { id, status } = req.params;

  // Validate status parameter
  if (!['delivered', 'voided'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const result = await transitionDeliveryStatus(id, status);
    return res.status(200).json(result);
  } catch (error) {
    switch (error.message) {
      case 'NOT_FOUND':
        return res.status(404).send();
      case 'CONFLICT':
        return res.status(409).json({ error: 'Delivery is not in draft state' });
      default:
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}