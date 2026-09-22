FUNCTION handleCreateProductTag(request, response):
    // 1. Authentication Check
    user = getAuthenticatedUser(request)
    IF user IS NULL:
        RETURN response.status(401).json({ error: "Unauthorized" })

    // 2. Input Validation
    input = request.body
    IF input.name IS EMPTY:
        RETURN response.status(422).json({ error: "Name is required" })

    // 3. Business Logic: Check for duplicates
    existingTag = Database.ProductTag.findOne({
        where: { 
            company_id: user.company_id, 
            name: input.name 
        }
    })
    
    IF existingTag IS NOT NULL:
        RETURN response.status(422).json({ error: "A tag with this name already exists" })

    // 4. Persistence
    TRY:
        newTag = Database.ProductTag.create({
            id: generateUUID(),
            company_id: user.company_id,
            name: input.name,
            description: input.description,
            created_at: getCurrentTimestamp()
        })
        
        RETURN response.status(201).json(newTag)
        
    CATCH error:
        RETURN response.status(500).json({ error: "Internal Server Error" })