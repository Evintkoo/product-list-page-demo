Define HTTP404Response, the error envelope for resources that cannot be located:
- status: always the literal integer 404
- error: human-readable message naming which resource was not found
Required fields: status, error.