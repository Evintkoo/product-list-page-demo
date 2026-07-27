Purpose: provide the data-access function that the Logic swimlane calls
to satisfy GET /api/products. This layer is only responsible for talking
to the database and reporting back either data or a data-level failure —
it does not know about HTTP status codes, but its outcomes map directly
to the response codes the Logic swimlane will translate:
  - success with rows            -> maps to 200 OK
  - success with zero total rows -> maps to 404 Not Found (no products exist)
  - invalid pagination inputs    -> maps to 400 Bad Request
  - unexpected database failure  -> maps to 500 Internal Server Error
  - authentication/authorization -> not handled here; enforced upstream,
    resulting in 401 Unauthorized before this function is ever invoked

Function: fetchProductList(page, limit)
  Input:
    - page: positive integer, the page number requested (starts at 1)
    - limit: positive integer, the number of records per page

  Step 1 - Validate inputs at the data-access boundary:
    - If page is missing, non-numeric, or less than 1 -> raise a
      "malformed pagination parameters" error (Logic layer turns this
      into 400 Bad Request).
    - If limit is missing, non-numeric, less than 1, or exceeds an
      allowed maximum (e.g. 100) -> raise the same malformed-parameters
      error.

  Step 2 - Compute offset:
    - offset = (page - 1) * limit

  Step 3 - Query the database:
    - Fetch Product rows ordered by created_at descending (or name,
      per business preference), applying offset and limit.
    - In parallel, compute totalCount = count of all Product rows
      matching the same (unfiltered) criteria.
    - Wrap the query execution in error handling: if the database
      connection fails or the query throws unexpectedly, raise a
      "data access failure" error (Logic layer turns this into
      500 Internal Server Error).

  Step 4 - Evaluate results:
    - If totalCount is zero -> raise a "no products found" condition
      (Logic layer turns this into 404 Not Found).
    - Otherwise, return a structured result:
        {
          items: [ list of Product records as defined above ],
          totalCount: total number of Product records matching criteria,
          page: page,
          limit: limit
        }

  Output contract (consumed by Logic swimlane):
    - On success: { items, totalCount, page, limit }
    - On failure: a typed error indicating one of
      "malformed_parameters" | "data_access_failure" | "not_found"

This output contract is the fixed signature the Logic swimlane must
call and interpret; it must not rename these fields, since the Frontend
swimlane's pagination metadata display depends on totalCount, page, and
limit matching exactly what this layer produces.