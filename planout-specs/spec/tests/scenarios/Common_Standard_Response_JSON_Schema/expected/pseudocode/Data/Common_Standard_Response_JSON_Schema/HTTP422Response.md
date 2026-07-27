Define a nested shape HTTP422ErrorDetail used inside HTTP422Response:
- field: the name of the input field that failed semantic validation
- issue: human-readable description of what is wrong with that field
Both field and issue are required on every entry.

Define HTTP422Response, the error envelope for semantically invalid (but well-formed) requests:
- status: always the literal integer 422
- error: short error label
- message: human-readable summary of the validation failure
- errors: optional list of HTTP422ErrorDetail entries, one per invalid field
Required fields: status, error, message.