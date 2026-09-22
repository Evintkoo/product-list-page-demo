/**
 * Data access layer for managing session lifecycle.
 */

FUNCTION findActiveSessionByToken(token: string):
  // Query the SESSION table for a record where the token matches
  // and revoked_at is NULL and expires_at is in the future.
  RETURN SESSION record OR NULL

FUNCTION revokeSession(sessionId: uuid):
  // Update the SESSION record where id matches sessionId.
  // Set revoked_at to the current timestamp.
  // This effectively invalidates the session in the database.
  RETURN success boolean