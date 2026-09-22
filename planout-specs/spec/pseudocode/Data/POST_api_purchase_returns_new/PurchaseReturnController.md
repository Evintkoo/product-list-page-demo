/**
 * Controller logic for POST /api/purchase_returns/new
 */
async function handleCreatePurchaseReturn(req, res) {
  const { request_uuid, return_type, items } = req.body;

  // 1. Idempotency Check
  const existing = await findByRequestUuid(request_uuid);
  if (existing) {
    return res.status(200).json(existing);
  }

  try {
    // 2. Execute Transaction
    const newReturn = await createPurchaseReturnTransaction(
      { request_uuid, return_type },
      items
    );

    // 3. Success Response
    return res.status(201).json(newReturn);
  } catch (error) {
    // 4. Error Handling
    if (error.isValidationError) {
      return res.status(422).json({ error: error.message });
    }
    if (error.isNotFound) {
      return res.status(404).json({ error: "Resource not found" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}