function getServiceWorkOrders(request) {
  // 1. Validate Authentication & Authorization
  const user = authenticate(request);
  if (!user) return respond(401, "Unauthorized");

  // 2. Validate Query Parameters
  const { ref_code_cont, store_id, limit = 20, offset = 0 } = request.query;

  if (!store_id || !ref_code_cont || ref_code_cont.length < 3) {
    return respond(422, "Invalid search parameters: store_id required and ref_code_cont must be at least 3 characters");
  }

  // 3. Authorization Check: Ensure user has access to the requested store
  if (!user.canAccessStore(store_id)) {
    return respond(403, "Forbidden: User cannot access this store");
  }

  try {
    // 4. Fetch Data
    const results = ServiceWorkOrderService.search({
      ref_code_cont,
      store_id,
      company_id: user.company_id,
      limit,
      offset
    });

    return respond(200, results);
  } catch (error) {
    return respond(500, "Internal Server Error");
  }
}