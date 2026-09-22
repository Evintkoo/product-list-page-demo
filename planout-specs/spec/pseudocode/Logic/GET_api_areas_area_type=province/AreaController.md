FUNCTION handleGetAreas(request, response):
    // 1. Validate Authentication
    IF NOT session.isValid():
        RETURN response.status(401).json({ error: "Unauthorized" })

    // 2. Extract and Validate Query Parameters
    // Enforce area_type = 'province' as per feature requirement
    SET areaType = request.query.area_type
    IF areaType IS NOT "province":
        RETURN response.status(400).json({ error: "Invalid area_type" })

    SET filterName = request.query.name
    SET page = request.query.page OR 1
    SET pageSize = request.query.page_size OR 20

    // 3. Delegate to Service Layer
    TRY:
        SET result = AreaService.fetchAreas(
            areaType: areaType,
            nameFilter: filterName,
            page: page,
            pageSize: pageSize
        )
        RETURN response.status(200).json(result)
    CATCH error:
        RETURN response.status(500).json({ error: "Internal Server Error" })