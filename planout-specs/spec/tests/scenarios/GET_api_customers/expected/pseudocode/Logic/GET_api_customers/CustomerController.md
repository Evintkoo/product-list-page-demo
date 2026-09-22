FUNCTION GET /api/customers(query):
  // 1. Validate Query Parameters
  VALIDATE query.sort_by IN ["group", "code", "name"] OR NULL
  VALIDATE query.sort_order IN ["asc", "desc"] OR NULL
  VALIDATE query.type IN ["retail", "wholesale", "franchise", "consignment"] OR NULL
  
  // 2. Initialize Query Builder
  SET queryBuilder = DATABASE.Customer.SELECT(*)

  // 3. Apply Type Filtering
  IF query.type == "retail":
    FILTER queryBuilder WHERE is_wholesale = false AND is_franchise = false AND is_consignment = false
  ELSE IF query.type == "wholesale":
    FILTER queryBuilder WHERE is_wholesale = true
  ELSE IF query.type == "franchise":
    FILTER queryBuilder WHERE is_franchise = true
  ELSE IF query.type == "consignment":
    FILTER queryBuilder WHERE is_consignment = true

  // 4. Apply Exact Filters
  FOR EACH field IN ["customer_group_id", "customer_code", "tax_no", "name", "phone", "birthdate", "store_id", "is_active", "address", "salesperson_id"]:
    IF query[field] IS PRESENT:
      FILTER queryBuilder WHERE field = query[field]

  // 5. Apply Search
  IF query.search IS PRESENT:
    FILTER queryBuilder WHERE (customer_code LIKE %query.search% OR name LIKE %query.search% OR phone LIKE %query.search% OR email LIKE %query.search% OR tax_no LIKE %query.search%)

  // 6. Apply Sorting
  IF query.sort_by IS PRESENT:
    SET direction = query.sort_order OR "desc"
    // Map API sort keys to DB fields
    IF query.sort_by == "group": SORT queryBuilder BY customer_group_id direction
    IF query.sort_by == "code": SORT queryBuilder BY customer_code direction
    IF query.sort_by == "name": SORT queryBuilder BY name direction
  ELSE:
    SORT queryBuilder BY created_at DESC

  // 7. Pagination
  SET totalCount = COUNT(queryBuilder)
  APPLY LIMIT query.limit OR 20 TO queryBuilder
  APPLY OFFSET query.offset OR 0 TO queryBuilder

  // 8. Execute and Return
  SET results = EXECUTE queryBuilder
  RETURN 200 OK WITH { data: results, total_count: totalCount, limit: query.limit, offset: query.offset }