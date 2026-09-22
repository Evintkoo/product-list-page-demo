/**
 * Service layer to handle authentication logic.
 */
FUNCTION verifyToken(token):
    // Logic to decode and verify the JWT signature and expiration
    // Returns the user ID if valid, otherwise returns NULL
    TRY:
        SET payload = JWT.verify(token, CONFIG.SECRET_KEY)
        RETURN payload.sub
    CATCH:
        RETURN NULL