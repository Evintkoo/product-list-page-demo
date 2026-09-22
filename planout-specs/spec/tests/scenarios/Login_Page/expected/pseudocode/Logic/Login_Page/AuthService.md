/**
 * Logic for interacting with User and Session entities
 */
FUNCTION verifyUserCredentials(email, password):
    FIND User WHERE email = email
    IF User NOT FOUND:
        RETURN 401
    
    IF verify_hash(password, User.password_hash):
        GENERATE Session token
        SAVE Session { user_id: User.id, token: token, expires_at: NOW + 24h }
        RETURN 200, token
    ELSE:
        RETURN 401

FUNCTION checkUserExists(email):
    FIND User WHERE email = email
    RETURN (User IS NOT NULL)