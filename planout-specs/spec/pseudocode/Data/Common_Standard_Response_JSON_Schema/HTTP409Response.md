Define HTTP409Response, the error envelope for state conflicts:
- status: always the literal integer 409
- error: fixed label, always the string "Conflict"
- message: human-readable explanation of the conflicting state
- details: optional generic object carrying extra context about the conflict
Required fields: status, error, message.