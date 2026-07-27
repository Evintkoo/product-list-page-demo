Define HTTP500Response, the error envelope for unexpected server failures:
- status: always the literal integer 500
- error: human-readable message describing the unexpected failure
Required fields: status, error.