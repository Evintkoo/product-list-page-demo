/**
 * Maps database or system exceptions to API response codes.
 */

FUNCTION handleDataError(error):
    SWITCH error.type:
        CASE "DATABASE_CONNECTION_FAILURE":
            RETURN { status: 500, message: "Internal Server Error" }
        CASE "INVALID_QUERY_SYNTAX":
            RETURN { status: 400, message: "Bad Request: Malformed query parameters" }
        CASE "PERMISSION_DENIED":
            RETURN { status: 403, message: "Forbidden: Insufficient permissions" }
        CASE "UNAUTHORIZED_ACCESS":
            RETURN { status: 401, message: "Unauthorized: Invalid or missing credentials" }
        DEFAULT:
            RETURN { status: 500, message: "An unexpected error occurred" }