FUNCTION handleCreateServiceProductType(request, response):
    // 1. Validate Authentication
    IF NOT request.isAuthenticated():
        RETURN response.status(401).json({ error: "Unauthorized" })

    // 2. Extract and Validate Input
    data = request.body
    IF NOT data.name OR data.name.trim() == "":
        RETURN response.status(422).json({ error: "Name is required" })

    // 3. Handle Defaults for Optional Fields
    // If service_advisor_id or refund_account_id are missing, fetch company defaults
    IF NOT data.service_advisor_id OR NOT data.refund_account_id:
        defaultAccount = Database.ChartOfAccounts.findFirst({ 
            where: { account_code: "400.001.001" } 
        })
        
        IF NOT data.service_advisor_id:
            data.service_advisor_id = defaultAccount.id
            
        IF NOT data.refund_account_id:
            data.refund_account_id = defaultAccount.id

    // 4. Set default for is_active if not provided
    IF data.is_active IS NULL:
        data.is_active = true

    // 5. Persist to Database
    newType = Database.ServiceProductType.create({
        id: generateUUID(),
        name: data.name,
        description: data.description,
        service_advisor_id: data.service_advisor_id,
        refund_account_id: data.refund_account_id,
        is_active: data.is_active,
        created_at: getCurrentTimestamp()
    })

    // 6. Return Success
    RETURN response.status(201).json(newType)

CATCH error:
    RETURN response.status(500).json({ error: "Internal Server Error" })