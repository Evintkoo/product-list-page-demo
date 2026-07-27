Define HTTP400Response, the error envelope for malformed or invalid client requests:
- status: always the literal integer 400
- error: human-readable summary of why the request was rejected
- details: optional list of strings, each describing one specific validation or parsing failure
Required fields: status, error.