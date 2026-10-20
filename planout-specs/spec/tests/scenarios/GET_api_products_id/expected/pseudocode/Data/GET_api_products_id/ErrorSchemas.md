/**
 * Standardized error response structures for the API.
 */

FUNCTION getUnauthorizedError():
    RETURN {
        "error": "Unauthorized",
        "message": "Missing or invalid authentication credentials."
    }

FUNCTION getNotFoundError(resourceName):
    RETURN {
        "error": "Not Found",
        "message": "The requested resource could not be found.",
        "resource": resourceName
    }

FUNCTION getInternalServerError():
    RETURN {
        "error": "Internal Server Error",
        "message": "An unexpected server error occurred."
    }