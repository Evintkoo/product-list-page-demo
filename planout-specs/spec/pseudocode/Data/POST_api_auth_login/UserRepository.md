/**
 * Data access layer for User authentication.
 */
FUNCTION findUserByEmail(email):
    // Normalize input to ensure consistency
    SET normalizedEmail = email.trim().toLowerCase()
    
    // Fetch user record from database
    RETURN DB.query("SELECT id, password_hash, is_active, is_locked FROM User WHERE email = ?", [normalizedEmail])

FUNCTION createSession(userId):
    // Generate a new session record
    SET sessionId = UUID.generate()
    SET expiry = DateTime.now().addHours(24)
    
    DB.execute("INSERT INTO Session (id, user_id, expires_at) VALUES (?, ?, ?)", [sessionId, userId, expiry])
    RETURN sessionId