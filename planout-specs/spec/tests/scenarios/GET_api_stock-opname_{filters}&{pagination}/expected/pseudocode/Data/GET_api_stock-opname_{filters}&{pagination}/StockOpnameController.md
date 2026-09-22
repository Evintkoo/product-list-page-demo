/**
 * Controller logic for GET /api/stock-opname
 */
function handleGetStockOpname(request) {
  // Validate mandatory stock_type
  if (request.query.stock_type !== "warehouse") {
    return Response.badRequest("Invalid stock_type");
  }

  try {
    const data = getStockOpnameList(request.query);
    return Response.ok(data);
  } catch (error) {
    if (error.message === "DATABASE_LOOKUP_FAILED") {
      return Response.internalServerError();
    }
    return Response.badRequest();
  }
}