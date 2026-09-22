/**
 * Orchestrates the data retrieval for the GET /api/users endpoint.
 * Handles the logic for query parameters and data access.
 */
FUNCTION getUsersList(queryParams: { limit: integer, offset: integer }, requestingUserId: uuid):
    // 1. Authorization Check
    IF NOT isUserAdmin(requestingUserId) THEN
        THROW Error("Forbidden: User is not an admin", 403)
    END IF

    // 2. Sanitize/Default Query Parameters
    safeLimit = queryParams.limit OR 20
    safeOffset = queryParams.offset OR 0

    // 3. Fetch Data
    users = fetchUsers(safeLimit, safeOffset)

    // 4. Return formatted list
    RETURN {
        data: users,
        meta: {
            limit: safeLimit,
            offset: safeOffset
        }
    }