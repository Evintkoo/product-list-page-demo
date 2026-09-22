FUNCTION GET /api/service-work-orders(params, session):
  // 1. Validation
  IF params.store_id IS MISSING OR params.ref_code_cont IS MISSING:
    RETURN 422 "Missing required parameters: store_id and ref_code_cont"

  IF length(params.ref_code_cont) < 3:
    RETURN 422 "Search term must be at least 3 characters"

  // 2. Authorization
  // Verify user has access to the requested store
  IF NOT User.can_access_store(session.user_id, params.store_id):
    RETURN 403 "Forbidden: User cannot access this store"

  // 3. Query Execution
  // Scope by company (from session) and store (from params)
  // Filter by ref_code containing the search term
  // Apply pagination defaults
  SET limit = params.limit OR 20
  SET offset = params.offset OR 0

  SET results = ServiceWorkOrder.find_all(
    where: {
      company_id: session.company_id,
      store_id: params.store_id,
      ref_code: LIKE "%" + params.ref_code_cont + "%"
    },
    limit: limit,
    offset: offset,
    select: ["id", "ref_code", "aasm_state"]
  )

  // 4. Response
  RETURN 200 OK, results

// NOTE: The business logic for which aasm_state values are "pickable" 
// is currently pending definition. The controller currently returns 
// all states for the matching ref_code. 
// <!-- MISSING_FIELD: ServiceWorkOrder.is_pickable_state -->