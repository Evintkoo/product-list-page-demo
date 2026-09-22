/**
 * Orchestrates data operations for the logout process.
 */

FUNCTION performLogout(token: string):
  // 1. Attempt to retrieve the session from the database
  SET session = findActiveSessionByToken(token)

  // 2. If no session exists, return unauthorized status
  IF session IS NULL:
    RETURN { "status": 401, "error": "Unauthorized" }

  // 3. If session exists, revoke it in the database
  SET result = revokeSession(session.id)

  // 4. Return success status
  IF result IS TRUE:
    RETURN { "status": 200, "data": { "ok": true } }
  ELSE:
    RETURN { "status": 500, "error": "Internal Server Error" }