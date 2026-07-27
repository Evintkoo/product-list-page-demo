Define HTTP401Response, the error envelope for missing or invalid authentication:
- status: always the literal integer 401
- error: human-readable message explaining that authentication is required or invalid
Required fields: status, error.