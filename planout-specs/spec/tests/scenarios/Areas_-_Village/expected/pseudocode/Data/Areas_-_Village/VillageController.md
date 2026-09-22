/**
 * API Endpoint: GET /api/areas/villages
 * Maps incoming request query parameters to the repository function.
 */
FUNCTION handleGetVillages(request):
  params = {
    name: request.query.name,
    province_id: request.query.province_id,
    regency_municipality_id: request.query.regency_municipality_id,
    district_id: request.query.district_id,
    limit: request.query.limit OR 20,
    offset: request.query.offset OR 0
  }

  data = getVillages(params)
  
  RETURN JSON_RESPONSE({
    status: "success",
    data: data
  })