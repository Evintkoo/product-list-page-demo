Define HTTP403Response, the error envelope for authenticated-but-forbidden requests:
- status: always the literal integer 403
- error: human-readable message explaining why access is denied
Required fields: status, error.