/**
 * Handles persistence logic for Service Products.
 * Ensures atomicity using a database transaction.
 */
function createServiceProduct(data: ServiceProductCreateRequest, companyId: UUID) {
  return database.transaction(async (tx) => {
    // 1. Validate SKU uniqueness within the current company context
    const existing = await tx.ServiceProduct.findFirst({
      where: { sku: data.sku, company_id: companyId }
    });
    
    if (existing) {
      throw new ValidationError("SKU must be unique per company.");
    }

    // 2. Persist the main Service Product record
    const newProduct = await tx.ServiceProduct.create({
      data: {
        company_id: companyId,
        sku: data.sku,
        name: data.name,
        description: data.description,
        service_product_type_id: data.service_product_type_id,
        tax_id: data.tax_id,
        other_tax_id: data.other_tax_id,
        other_tax_account_id: data.other_tax_account_id,
        other_tax_refund_account_id: data.other_tax_refund_account_id,
        tax_product_code_id: data.tax_product_code_id,
        tax_uom_id: data.tax_uom_id,
        price: data.price,
        including_tax: data.including_tax ?? false,
        open_price: data.open_price ?? false,
        active: data.active ?? true,
        estimated_time_in_minutes: data.estimated_time_in_minutes,
        open_estimated_time: data.open_estimated_time ?? false
      }
    });

    // 3. Persist tag mappings if provided
    if (data.service_product_tag_ids && data.service_product_tag_ids.length > 0) {
      const mappings = data.service_product_tag_ids.map(tagId => ({
        service_product_id: newProduct.id,
        tag_id: tagId
      }));
      
      await tx.ServiceProductTagsMapping.createMany({
        data: mappings
      });
    }

    return newProduct;
  });
}