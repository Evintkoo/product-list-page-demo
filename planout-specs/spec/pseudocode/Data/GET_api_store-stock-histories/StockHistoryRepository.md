### Node: 8b212806-cdf9-4706-bf5d-eaef8bffc9d9 (Fetch Store Stock Histories)

**Inputs:** 
- Receives `store_id` (UUID) from the Logic swimlane via the `GET /api/store-stock-histories` controller request.

**Logic:**
- Execute a database query to retrieve records from the `STOCK_HISTORY` table.
- Filter records where `store_id` matches the provided input.
- Order the results by `created_at` in descending order to show the most recent changes first.

**Happy Path:**
- Query returns a list of `STOCK_HISTORY` objects.
- Return the list to the Logic swimlane as an array of objects.

**Validation/Error States:**
- If `store_id` is invalid or missing, return a "400 Bad Request" error.
- If the database connection fails, return a "500 Internal Server Error".

**Empty State:**
- If no records are found for the given `store_id`, return an empty array `[]`.

**Side Effects:**
- None.

**Outputs:**
- Hands the array of `STOCK_HISTORY` records to the Logic swimlane for serialization.

**Notes covered:**
- Fetch stock change histories owned by store.