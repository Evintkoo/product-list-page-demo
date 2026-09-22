FUNCTION handleCreateFlexibleVoucher(request, response):
    // 1. Authentication & Authorization Check
    IF NOT request.isAuthenticated():
        RETURN response.status(401).send({ error: "Unauthorized" })
    
    IF NOT request.user.hasPermission("CREATE_VOUCHER"):
        RETURN response.status(403).send({ error: "Forbidden" })

    // 2. Validate Request Body
    TRY:
        validatedData = validate(request.body, {
            sku: "required|string",
            name: "required|string",
            description: "optional|string",
            value: "required|decimal",
            currency: "required|string"
        })
    CATCH validationError:
        RETURN response.status(422).send({ errors: validationError.details })

    // 3. Check for SKU Uniqueness
    existingVoucher = DB.FlexibleVoucher.findOne({ sku: validatedData.sku })
    IF existingVoucher IS NOT NULL:
        RETURN response.status(409).send({ error: "SKU already exists" })

    // 4. Prepare and Persist Entity
    newVoucher = {
        id: generateUUID(),
        sku: validatedData.sku,
        name: validatedData.name,
        description: validatedData.description,
        value: validatedData.value,
        currency: validatedData.currency,
        created_at: getCurrentTimestamp(),
        updated_at: getCurrentTimestamp()
    }

    TRY:
        savedVoucher = DB.FlexibleVoucher.insert(newVoucher)
        RETURN response.status(201).send(savedVoucher)
    CATCH dbError:
        RETURN response.status(500).send({ error: "Internal Server Error" })