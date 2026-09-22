/**
 * Validates that the current user has the required permissions to perform the confirmation.
 */
FUNCTION isAuthorized(user: User):
    IF user.role IS 'admin' OR user.role IS 'manager':
        RETURN TRUE
    ELSE:
        RETURN FALSE