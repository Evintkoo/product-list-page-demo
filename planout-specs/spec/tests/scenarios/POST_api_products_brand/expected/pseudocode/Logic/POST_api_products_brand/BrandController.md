FUNCTION handleCreateBrand(request, response):
    // 1. Authentication Check
    user = getAuthenticatedUser(request)
    IF user IS NULL:
        RETURN response.status(401).json({ error: "Unauthorized" })

    // 2. Extract and Validate Input
    brandName = request.body.name
    brandDescription = request.body.description

    IF brandName IS EMPTY:
        RETURN response.status(422).json({ error: "Name is required" })

    // 3. Check for existing brand name
    existingBrand = Database.Brand.findOne({ name: brandName })
    IF existingBrand IS NOT NULL:
        RETURN response.status(422).json({ error: "A brand with this name already exists" })

    // 4. Prepare Data
    newBrand = {
        id: generateUUID(),
        company_id: user.company_id, <!-- MISSING_FIELD: User.company_id -->
        name: brandName,
        description: brandDescription,
        created_at: getCurrentTimestamp()
    }

    // 5. Persist to Database
    TRY:
        createdBrand = Database.Brand.insert(newBrand)
        RETURN response.status(201).json(createdBrand)
    CATCH error:
        RETURN response.status(500).json({ error: "Internal Server Error" })