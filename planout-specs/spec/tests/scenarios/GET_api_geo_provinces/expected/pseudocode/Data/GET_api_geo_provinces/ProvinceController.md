FUNCTION handleGetProvinces(request):
    // 1. Validate Authentication
    IF NOT Session.isValid():
        RETURN Response(401, "Unauthorized")

    // 2. Extract and Validate Query Parameters
    country_id = request.query.country_id
    IF country_id IS NULL OR NOT isValidUUID(country_id):
        RETURN Response(400, "Invalid or missing country_id")

    // 3. Fetch Data
    TRY:
        provinces = ProvinceRepository.getProvincesByCountry(country_id)
        
        // 4. Return Success Response
        RETURN Response(200, {
            "status": 200,
            "data": provinces
        })
    CATCH error:
        // 5. Handle Unexpected Failures
        LOG_ERROR(error)
        RETURN Response(500, "Internal Server Error")