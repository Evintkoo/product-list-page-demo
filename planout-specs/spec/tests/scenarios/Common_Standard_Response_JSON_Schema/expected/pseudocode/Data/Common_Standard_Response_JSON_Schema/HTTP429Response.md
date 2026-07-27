Define HTTP429Response, the error envelope for rate-limited clients:
- status: always the literal integer 429
- error: human-readable message describing the rate-limiting condition
- retryAfter: optional integer, number of seconds the client should wait before retrying
Required fields: status, error.