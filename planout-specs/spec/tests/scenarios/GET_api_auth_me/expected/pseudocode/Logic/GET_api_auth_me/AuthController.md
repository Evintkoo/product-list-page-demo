/**
 * Handles the retrieval of the currently authenticated user profile.
 * This endpoint is designed to be called by the frontend upon application load
 * to determine the identity and status of the current session.
 */
FUNCTION GET_AUTH_ME(request):
    // 1. Extract the session token from the Authorization header
    SET token = request.headers.get("Authorization")
    
    // 2. Validate session and retrieve user ID
    // Logic assumes a middleware or service validates the JWT/Session
    SET userId = AUTH_SERVICE.verifyToken(token)
    
    IF userId IS NULL:
        RETURN 401 "Unauthorized"
    
    // 3. Fetch user record from database
    SET user = DATABASE.USER.findUnique(
        WHERE id = userId
    )
    
    IF user IS NULL:
        RETURN 401 "Unauthorized"
        
    // 4. Return user profile
    // Note: We explicitly include 'must_change_password' so the frontend
    // can trigger a redirect to the password reset flow if required.
    RETURN 200 {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "must_change_password": user.must_change_password,
        "is_active": user.is_active,
        "created_at": user.created_at
    }