/**
 * Orchestrates validation and repository calls for the POST /api/discrepancy-stocks endpoint.
 */
async function handleCreateDiscrepancyStock(requestBody, session) {
  // 1. Validate: entity_id belongs to caller's company
  const store = await database.find('STORE', { id: requestBody.entity_id, company_id: session.company_id });
  if (!store) throw new UnprocessableEntityError("Invalid store for this company");

  // 2. Validate: items list not empty
  if (!requestBody.items || requestBody.items.length === 0) {
    throw new UnprocessableEntityError("At least one item is required");
  }

  // 3. Validate: quantity > 0 and unique product_ids
  const seenProducts = new Set();
  for (const item of requestBody.items) {
    if (item.quantity <= 0) throw new UnprocessableEntityError("Quantity must be above zero");
    if (seenProducts.has(item.product_id)) throw new UnprocessableEntityError("Duplicate product in list");
    
    const productExists = await database.exists('PRODUCT', { id: item.product_id });
    if (!productExists) throw new UnprocessableEntityError("Unknown product_id");
    
    seenProducts.add(item.product_id);
  }

  // 4. Persist
  return await createDiscrepancyStock(requestBody, {
    companyId: session.company_id,
    creatorId: session.user_id
  });
}