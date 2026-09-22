/**
 * PATCH /api/stock-outgoings/:id/status
 */
async function updateStatus(req, res) {
  const { id, status: nextStatus } = req.params;
  const userId = req.user.id;

  // 1. Fetch existing record
  const outgoing = db.StockOutgoing.findById(id);
  if (!outgoing) return res.status(404).send("Not Found");

  // 2. Validate transition
  if (!validateTransition(outgoing.status, nextStatus)) {
    return res.status(409).send("Conflict: Invalid state transition");
  }

  // 3. If confirming, perform stock check
  if (nextStatus === "confirmed") {
    const stockCheck = await checkStockAvailability(id);
    if (!stockCheck.valid) {
      return res.status(422).json({ errors: stockCheck.errors });
    }
  }

  // 4. Update record
  const updatedOutgoing = db.StockOutgoing.update({
    where: { id },
    data: {
      status: nextStatus,
      updater_id: userId,
      updated_at: new Date()
    }
  });

  return res.status(200).json(updatedOutgoing);
}