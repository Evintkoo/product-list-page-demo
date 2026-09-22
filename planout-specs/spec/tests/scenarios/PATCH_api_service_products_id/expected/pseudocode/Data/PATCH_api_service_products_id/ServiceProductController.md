/**
 * PATCH /api/service_products/:id
 * Updates an existing service product and its associated tags.
 */
async function updateServiceProduct(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  // 1. Validate existence
  const existingProduct = await db.ServiceProduct.findById(id);
  if (!existingProduct) {
    return res.status(404).json({ error: "Service product not found" });
  }

  // 2. Validate business rules (SKU uniqueness per company)
  const duplicateSku = await db.ServiceProduct.findOne({
    where: { 
      sku: updateData.sku, 
      company_id: existingProduct.company_id,
      id: { $ne: id } 
    }
  });

  if (duplicateSku) {
    return res.status(422).json({ error: "SKU must be unique per company" });
  }

  try {
    // 3. Perform update within a transaction
    const updatedProduct = await db.transaction(async (t) => {
      // Update main record
      await db.ServiceProduct.update(updateData, { where: { id }, transaction: t });

      // 4. Sync tags
      // Remove existing associations
      await db.ServiceProductTagsMapping.destroy({ where: { service_product_id: id }, transaction: t });
      
      // Add new associations
      if (updateData.tag_ids && updateData.tag_ids.length > 0) {
        const mappings = updateData.tag_ids.map(tagId => ({
          service_product_id: id,
          tag_id: tagId
        }));
        await db.ServiceProductTagsMapping.bulkCreate(mappings, { transaction: t });
      }

      return await db.ServiceProduct.findById(id, { transaction: t });
    });

    return res.status(200).json(updatedProduct);

  } catch (error) {
    // Handle specific error types
    if (error.isValidationError) {
      return res.status(422).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}