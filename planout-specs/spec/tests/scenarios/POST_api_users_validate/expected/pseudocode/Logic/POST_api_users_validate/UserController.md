FUNCTION handleValidateUser(request, response):
    // 1. Authentication & Authorization Check
    IF NOT isAuthenticated(request):
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    IF NOT isAuthorized(request.user, "validate_user"):
        RETURN response.status(403).json({ error: "Forbidden" })

    // 2. Payload Validation
    // Validate against ValidateUserRequest schema
    LET validationResult = validateSchema(request.body, "ValidateUserRequest")
    IF NOT validationResult.isValid:
        RETURN response.status(422).json({ errors: validationResult.errors })

    // 3. Business Logic
    // Normalize email: trim and lowercase
    LET targetEmail = request.body.email.trim().toLowerCase()
    
    // Check database for existence
    LET userExists = Database.User.findOne({ email: targetEmail })

    // 4. Response
    IF userExists:
        RETURN response.status(200).json({ 
            exists: true, 
            email: targetEmail 
        })
    ELSE:
        RETURN response.status(200).json({ 
            exists: false, 
            email: targetEmail 
        })