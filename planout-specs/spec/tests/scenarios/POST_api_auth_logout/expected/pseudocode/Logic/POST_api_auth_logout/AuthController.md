/**
 * Handles the logout request by invalidating the session token
 * found in the request cookies.
 */
FUNCTION handleLogout(request, response):
    // 1. Extract the session token from the request cookie
    SET sessionToken = request.cookies.get("session_token") <!-- MISSING_FIELD: SESSION.token_cookie -->

    IF sessionToken IS NULL:
        RETURN response.status(401).json({ "error": "No active session found" })
    END IF

    // 2. Locate the session in the database
    SET currentSession = DATABASE.SESSION.findFirst({
        WHERE: { token: sessionToken }
    })

    // 3. Validate session existence
    IF currentSession IS NULL OR currentSession.revoked_at IS NOT NULL:
        RETURN response.status(401).json({ "error": "Invalid or already revoked session" })
    END IF

    // 4. Revoke the session
    DATABASE.SESSION.update({
        WHERE: { id: currentSession.id },
        DATA: { revoked_at: CURRENT_TIMESTAMP }
    })

    // 5. Clear the session cookie from the client
    response.clearCookie("session_token")

    // 6. Return success
    RETURN response.status(200).json({ "message": "Successfully logged out" })
END FUNCTION