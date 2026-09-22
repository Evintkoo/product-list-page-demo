/**
 * Logic to retrieve the current user context.
 * This service is invoked by the GET /api/auth/me controller.
 */
FUNCTION getCurrentUser(sessionToken):
    // 1. Validate session and extract userId
    userId = sessionManager.verify(sessionToken)
    
    IF userId IS NULL:
        THROW UnauthorizedError("Invalid or expired session")

    // 2. Fetch user from repository
    user = UserRepository.findUserById(userId)
    
    IF user IS NULL:
        THROW UnauthorizedError("User no longer exists")

    // 3. Return sanitized user object
    RETURN UserRepository.mapToPublicUser(user)