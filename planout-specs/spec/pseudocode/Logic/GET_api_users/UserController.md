FUNCTION handleGetUsers(request, response):
    // 1. Authentication Check
    IF request.headers.authorization IS MISSING:
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    // 2. Authorization Check
    // Verify if the authenticated user has the 'admin' role
    currentUser = AUTH_SERVICE.getCurrentUser(request)
    IF currentUser.role != "admin":
        RETURN response.status(403).json({ error: "Forbidden: Admin access required" })

    // 3. Fetch Data
    // Retrieve users from the database, ordered by created_at descending
    // to satisfy the "newest first" requirement
    users = USER_SERVICE.findAll(
        orderBy: "created_at",
        orderDirection: "DESC"
    )

    // 4. Return Response
    RETURN response.status(200).json(users)