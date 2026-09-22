FUNCTION handleCreateServiceProduct(request, response):
    // 1. Authentication Check
    IF NOT user.isAuthenticated():
        RETURN response.status(401).json({ error: "Unauthorized" })

    // 2. Extract and Validate Input
    data = request.body
    
    // Validate required fields
    IF NOT data.sku OR NOT data.name OR NOT data.tax_id OR NOT data.other_tax_id OR NOT data.price:
        RETURN response.status(422).json({ error: "Missing required fields" })

    // 3. Business Logic Validation
    // Check for unique SKU per company
    existingProduct = DB.ServiceProduct.findOne({ 
        where: { sku: data.sku, company_id: data.company_id } 
    })
    IF existingProduct:
        RETURN response.status(422).json({ error: "SKU must be unique per company" })

    // 4. Persistence
    TRY:
        DB.transaction(async (tx) => {
            // Create the Service Product
            newProduct = DB.ServiceProduct.create({
                company_id: data.company_id,
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
                including_tax: data.including_tax,
                open_price: data.open_price,
                active: data.active,
                estimated_time_in_minutes: data.estimated_time_in_minutes,
                open_estimated_time: data.open_estimated_time,
                created_at: CURRENT_TIMESTAMP
            }, { transaction: tx })

            // Create Tag Mappings if tags provided
            IF data.tag_ids IS NOT EMPTY:
                FOR EACH tag_id IN data.tag_ids:
                    DB.ServiceProductTagsMapping.create({
                        service_product_id: newProduct.id,
                        tag_id: tag_id
                    }, { transaction: tx })
            
            RETURN newProduct
        })

        RETURN response.status(201).json(newProduct)

    CATCH error:
        RETURN response.status(500).json({ error: "Internal Server Error" })