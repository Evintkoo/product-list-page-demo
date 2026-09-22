FUNCTION getActiveProvincesByCountry(countryId):
    // Query the database for provinces matching the criteria
    // Filter: Province.country_id == countryId AND Province.is_active == true
    // Sort: Province.name ASC
    
    SET results = DATABASE.Province.findMany(
        where: {
            country_id: countryId,
            is_active: true
        },
        orderBy: {
            name: "asc"
        },
        select: {
            id: true,
            name: true
        }
    )
    
    RETURN results