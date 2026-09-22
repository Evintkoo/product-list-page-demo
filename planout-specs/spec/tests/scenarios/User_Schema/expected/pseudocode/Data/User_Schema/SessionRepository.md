// Validates session and joins with user data for "Auth Me" flow
// Ensures session is not expired and user is active
function getActiveSessionWithUser(sessionId: string): { session: Session, user: User } | null {
  return db.query(`
    SELECT s.*, u.*
    FROM sessions s
    INNER JOIN users u ON u.id = s.user_id
    WHERE s.id = $1
      AND s.expires_at > CURRENT_TIMESTAMP
      AND s.absolute_expires_at > CURRENT_TIMESTAMP
      AND u.is_active = TRUE
    LIMIT 1
  `, [sessionId]);
}