FUNCTION handleUpdateServiceProduct(request, response):
    // 1. Extract ID from path
    SET serviceProductId = request.params.id
    
    // 2. Validate existence
    SET existingProduct = Database.ServiceProduct.find(serviceProductId)
    IF existingProduct IS NULL:
        RETURN response.status(404).json({ error: "Service product not found" })

    // 3. Validate input data
    SET payload = request.body
    IF NOT validateRequiredFields(payload):
        RETURN response.status(422).json({ error: "Missing required fields" })
    
    // 4. Check SKU uniqueness (excluding current record)
    SET duplicateSku = Database.ServiceProduct.where(sku == payload.sku)
                                              .where(company_id == existingProduct.company_id)
                                              .where(id != serviceProductId)
                                              .first()
    IF duplicateSku IS NOT NULL:
        RETURN response.status(422).json({ error: "SKU must be unique per company" })

    // 5. Perform Update
    TRY:
        Database.transaction(BEGIN):
            // Update main entity
            Database.ServiceProduct.update(serviceProductId, {
                sku: payload.sku,
                name: payload.name,
                tax_id: payload.tax_id,
                other_tax_id: payload.other_tax_id,
                price: payload.price
            })

            // Sync Tags
            // Remove existing mappings
            Database.ServiceProductTagsMapping.where(service_product_id == serviceProductId).delete()
            
            // Insert new mappings
            FOR EACH tagId IN payload.tag_ids:
                Database.ServiceProductTagsMapping.insert({
                    service_product_id: serviceProductId,
                    tag_id: tagId
                })
        
        // 6. Return updated record
        SET updatedProduct = Database.ServiceProduct.find(serviceProductId)
        RETURN response.status(200).json(updatedProduct)

    CATCH error:
        RETURN response.status(500).json({ error: "Internal server error" })

FUNCTION validateRequiredFields(data):
    // Ensure SKU, Name, Tax, Other Tax, and Price are present
    RETURN data.sku AND data.name AND data.tax_id AND data.other_tax_id AND data.price IS NOT NULL