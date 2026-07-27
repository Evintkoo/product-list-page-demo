Define a reference lookup, HttpStatusCodeOverview, used only for documentation/validation tooling (not persisted at runtime):
- code: the numeric HTTP status code (primary key of this lookup)
- name: the canonical name of the status (e.g. "Created", "Bad Request")
- description: a short explanation of when this status applies

Seed this lookup with the standard set the API supports: 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests, 500 Internal Server Error, 503 Service Unavailable. Every schema below corresponds to exactly one row in this lookup, keyed by its "status" field.