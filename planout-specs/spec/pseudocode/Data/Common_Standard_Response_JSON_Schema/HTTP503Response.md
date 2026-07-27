Define HTTP503Response, the error envelope for temporary service outages:
- status: always the literal integer 503
- error: human-readable message describing why the service is temporarily unavailable
Required fields: status, error.

Downstream contract note: the Logic swimlane must select exactly one of these ten schemas per response based on the outcome of the operation it performs, populate the fields as defined here without renaming or reshaping them, and the Frontend swimlane must parse responses expecting these exact field names ("status", "data", "location", "error", "message", "details", "errors", "retryAfter", "field", "issue") so the API contract stays consistent end-to-end.