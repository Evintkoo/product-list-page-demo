/**
 * POST /api/discrepancy-stocks
 * Creates a new discrepancy stock document in DRAFT status.
 */
async function createDiscrepancyStock(req, res) {
  const { entity_id, items } = req.body;
  const creator_id = req.session.user_id;
  const company_id = req.session.company_id;

  // 1. Validation
  if (!entity_id) throw new ValidationError("Entity is required", "entity_id");
  if (!items || items.length === 0) throw new ValidationError("Product table cannot be empty", "items");
  
  const productIds = items.map(i => i.product_id);
  if (new Set(productIds).size !== productIds.length) {
    throw new ValidationError("Duplicate products found", "items");
  }

  for (const item of items) {
    if (!item.product_id) throw new ValidationError("Product must be picked", "product_id");
    if (item.quantity <= 0) throw new ValidationError("Quantity must be greater than zero", "quantity");
  }

  // 2. Transactional Write
  await db.transaction(async (tx) => {
    const entity = await tx.entities.findUnique({ where: { id: entity_id } });
    const sequence = await generateSequence(tx, "DISC", entity.code);
    const document_ref = `DISC/${entity.code}/${sequence}`;

    const header = await tx.discrepancy_stocks.create({
      data: {
        document_ref,
        entity_id,
        entity_type: "store",
        status: "DRAFT",
        created_by: creator_id
      }
    });

    const itemsToInsert = items.map(item => ({
      discrepancy_stock_id: header.id,
      product_id: item.product_id,
      quantity: item.quantity,
      notes: item.notes
    }));

    await tx.discrepancy_stock_items.createMany({ data: itemsToInsert });

    // 3. Return Response
    return res.status(201).json({
      id: header.id,
      document_ref: header.document_ref,
      status: header.status,
      items: itemsToInsert
    });
  });
}