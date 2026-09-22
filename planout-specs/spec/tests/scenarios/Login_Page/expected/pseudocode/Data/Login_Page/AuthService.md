/**
 * Validates user credentials against the User entity.
 * Returns the User record if valid, otherwise throws an authentication error.
 */
FUNCTION authenticateUser(email, password_input):
    user = DATABASE.find("User", { email: email })
    
    IF user IS NULL OR NOT verifyHash(password_input, user.password_hash):
        THROW AuthenticationError("Invalid email or password")
    
    RETURN user

/**
 * Creates a new session for the authenticated user.
 */
FUNCTION createSession(user_id):
    session_token = GENERATE_SECURE_TOKEN()
    session = DATABASE.insert("Session", {
        user_id: user_id,
        token: session_token,
        expires_at: NOW() + 24_HOURS
    })
    RETURN session