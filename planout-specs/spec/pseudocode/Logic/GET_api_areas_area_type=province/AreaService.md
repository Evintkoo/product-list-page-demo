FUNCTION fetchAreas(areaType, nameFilter, page, pageSize):
    // Calculate offset for pagination
    SET offset = (page - 1) * pageSize

    // Build query against Area entity
    // Filter by area_type (mandatory) and name (optional)
    SET query = Database.Area.findMany()
        .where(area_type == areaType)
    
    IF nameFilter IS NOT NULL:
        query = query.where(name.contains(nameFilter))

    // Apply sorting and pagination
    SET data = query
        .orderBy(name: "ASC")
        .limit(pageSize)
        .offset(offset)
        .execute()

    RETURN {
        data: data,
        meta: {
            page: page,
            page_size: pageSize
        }
    } <!-- MISSING_FIELD: Area.total_count -->