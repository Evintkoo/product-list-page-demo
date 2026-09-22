/**
 * API Endpoint: POST /api/auth/login
 * Request Body: { email, password }
 */
ENDPOINT POST /api/auth/login(request):
    user = authenticateUser(request.email, request.password)
    session = createSession(user.id)
    
    SET_COOKIE("auth_token", session.token)
    RETURN { status: "success", user_id: user.id }

/**
 * API Endpoint: GET /api/auth/me
 * Validates the current session via the auth_token cookie.
 */
ENDPOINT GET /api/auth/me():
    token = GET_COOKIE("auth_token")
    session = DATABASE.find("Session", { token: token })
    
    IF session IS NULL OR session.expires_at < NOW():
        THROW UnauthorizedError("Session expired or invalid")
        
    user = DATABASE.find("User", { id: session.user_id })
    RETURN { status: "success", user: { id: user.id, email: user.email } }