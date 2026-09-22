// Centralized error handling for the API
FUNCTION handleApiError(error, response):
    IF error IS AuthenticationError:
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    // Default fallback
    RETURN response.status(500).json({ error: "Internal Server Error" })