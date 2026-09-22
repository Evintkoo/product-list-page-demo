/**
 * Logic layer for authentication processing.
 */
FUNCTION authenticateUser(email, password):
    SET user = UserRepository.findUserByEmail(email)
    
    // Constant-time verification to prevent user enumeration
    // If user not found, use a dummy hash to simulate work
    SET hashToVerify = user ? user.password_hash : "dummy_hash_for_timing_safety"
    SET isPasswordValid = Crypto.verify(password, hashToVerify)
    
    // Check all failure conditions (not found, wrong password, inactive, locked)
    // Return generic error if any condition fails
    IF NOT user OR NOT isPasswordValid OR NOT user.is_active OR user.is_locked:
        THROW UNAUTHORIZED_ERROR("Invalid email or password")
        
    // If all checks pass, create session
    SET sessionId = UserRepository.createSession(user.id)
    
    RETURN {
        "id": user.id,
        "email": email,
        "sessionId": sessionId
    }