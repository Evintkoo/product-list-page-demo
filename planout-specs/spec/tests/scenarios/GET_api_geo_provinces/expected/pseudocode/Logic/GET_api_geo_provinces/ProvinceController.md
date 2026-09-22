FUNCTION handleGetProvinces(request):
    // 1. Validate Authentication
    IF session IS missing OR invalid:
        RETURN 401 Unauthorized

    // 2. Extract and Validate Query Parameters
    SET countryId = request.query.country_id
    IF countryId IS empty OR NOT valid_uuid(countryId):
        RETURN 400 Bad Request (message: "Invalid or missing country_id")

    // 3. Fetch Data
    TRY:
        SET provinces = ProvinceService.getActiveProvincesByCountry(countryId)
        RETURN 200 OK, body: { "status": 200, "data": provinces }
    CATCH error:
        RETURN 500 Internal Server Error