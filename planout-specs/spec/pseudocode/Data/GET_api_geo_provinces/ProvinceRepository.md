FUNCTION getProvincesByCountry(country_id: UUID):
    // Fetch provinces filtered by country and active status
    // Sort results by name in ascending order
    RETURN Database.query(
        SELECT id, name 
        FROM Province 
        WHERE country_id = country_id 
        AND is_active = TRUE 
        ORDER BY name ASC
    )